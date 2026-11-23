// ============================================================
// Route: /api/content
// Real Firebase Cloud Firestore + Local Cache Fallback
// ============================================================
const express  = require('express');
const router   = express.Router();
const fs       = require('fs');
const path     = require('path');
const requireAuth = require('../middleware/auth');
const {
  cloudGetContent,
  cloudGetAllContent,
  cloudSaveContent,
} = require('../firebase-cloud');

const DATA_DIR = path.join(__dirname, '../data');
const LOCAL_CONTENT_FILE = path.join(DATA_DIR, 'content.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(LOCAL_CONTENT_FILE)) {
  fs.writeFileSync(LOCAL_CONTENT_FILE, JSON.stringify({}));
}

function getLocalContent() {
  try {
    return JSON.parse(fs.readFileSync(LOCAL_CONTENT_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveLocalContent(content) {
  fs.writeFileSync(LOCAL_CONTENT_FILE, JSON.stringify(content, null, 2));
}

// GET /api/content/:section — get specific section content
router.get('/:section', async (req, res) => {
  try {
    const { section } = req.params;

    try {
      const cloudData = await cloudGetContent(section);
      if (cloudData) {
        return res.json({ data: cloudData });
      }
    } catch (fbErr) {
      console.warn('Firebase Cloud content read notice:', fbErr.message);
    }

    const localData = getLocalContent();
    res.json({ data: localData[section] || null });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch content.' });
  }
});

// GET /api/content — get all content sections
router.get('/', async (req, res) => {
  try {
    try {
      const cloudAll = await cloudGetAllContent();
      if (cloudAll && Object.keys(cloudAll).length > 0) {
        return res.json({ data: cloudAll });
      }
    } catch (fbErr) {
      console.warn('Firebase Cloud all content notice:', fbErr.message);
    }

    const localData = getLocalContent();
    res.json({ data: localData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch content.' });
  }
});

// PUT /api/content/:section — update content (admin only)
router.put('/:section', requireAuth, async (req, res) => {
  try {
    const { section } = req.params;
    const updateData = { ...req.body, updatedAt: new Date().toISOString() };

    try {
      await cloudSaveContent(section, updateData);
    } catch (fbErr) {
      console.warn('Firebase Cloud save notice:', fbErr.message);
    }

    const localData = getLocalContent();
    localData[section] = { ...(localData[section] || {}), ...updateData };
    saveLocalContent(localData);

    res.json({ success: true, data: localData[section] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save content.' });
  }
});

module.exports = router;
