// ============================================================
// Route: /api/messages
// Real Firebase Cloud Firestore + Local Data Store Fallback
// ============================================================
const express  = require('express');
const router   = express.Router();
const fs       = require('fs');
const path     = require('path');
const requireAuth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const {
  cloudAddMessage,
  cloudGetMessages,
  cloudMarkMessageRead,
  cloudDeleteMessage,
} = require('../firebase-cloud');

const DATA_DIR = path.join(__dirname, '../data');
const LOCAL_MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(LOCAL_MESSAGES_FILE)) {
  fs.writeFileSync(LOCAL_MESSAGES_FILE, JSON.stringify([]));
}

function getLocalMessages() {
  try {
    return JSON.parse(fs.readFileSync(LOCAL_MESSAGES_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveLocalMessages(msgs) {
  fs.writeFileSync(LOCAL_MESSAGES_FILE, JSON.stringify(msgs, null, 2));
}

// POST /api/messages — submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, honeypot } = req.body;

    // Bot check
    if (honeypot) return res.json({ success: true });

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message too long (max 2000 characters).' });
    }

    const newMsg = {
      id: uuidv4(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || 'General Inquiry',
      message: message.trim(),
      read: false,
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection?.remoteAddress,
    };

    // 1. Try Firebase Cloud Firestore
    try {
      const cloudId = await cloudAddMessage(newMsg);
      if (cloudId) {
        newMsg.id = cloudId;
        newMsg.firestoreId = cloudId;
      }
    } catch (fbErr) {
      console.warn('Firebase Cloud write notice:', fbErr.message);
    }

    // Always keep in local data cache
    const localMsgs = getLocalMessages();
    localMsgs.unshift(newMsg);
    saveLocalMessages(localMsgs);

    res.status(201).json({ success: true, id: newMsg.id });
  } catch (err) {
    console.error('[messages/POST]', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// GET /api/messages — get all messages (admin only)
router.get('/', requireAuth, async (req, res) => {
  try {
    // 1. Try Firebase Cloud Firestore
    try {
      const cloudMsgs = await cloudGetMessages();
      if (cloudMsgs && cloudMsgs.length > 0) {
        return res.json({ messages: cloudMsgs });
      }
    } catch (fbErr) {
      console.warn('Firebase Cloud read notice:', fbErr.message);
    }

    // Local fallback
    const messages = getLocalMessages();
    res.json({ messages });
  } catch (err) {
    console.error('[messages/GET]', err);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// PATCH /api/messages/:id — mark as read (admin only)
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await cloudMarkMessageRead(id);
    } catch (fbErr) {
      console.warn('Firebase Cloud update notice:', fbErr.message);
    }

    const messages = getLocalMessages();
    const target = messages.find((m) => m.id === id || m.firestoreId === id);
    if (target) {
      target.read = true;
      saveLocalMessages(messages);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update message.' });
  }
});

// DELETE /api/messages/:id — delete message (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await cloudDeleteMessage(id);
    } catch (fbErr) {
      console.warn('Firebase Cloud delete notice:', fbErr.message);
    }

    const messages = getLocalMessages().filter((m) => m.id !== id && m.firestoreId !== id);
    saveLocalMessages(messages);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message.' });
  }
});

module.exports = router;
