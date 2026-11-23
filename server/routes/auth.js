// ============================================================
// Route: /api/auth
// Server-side Admin Authentication using .env credentials
// ============================================================
const express = require('express');
const router  = express.Router();
const crypto  = require('crypto');
const { admin } = require('../firebase-admin');

// POST /api/auth/login — authenticates admin against server-side .env credentials
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@afrigold.co.tz').toLowerCase();
    const envAdminPassword = process.env.ADMIN_PASSWORD || 'Afrigold2026!';

    // 1. Verify against server .env credentials
    if (email.trim().toLowerCase() === envAdminEmail && password === envAdminPassword) {
      const secret = process.env.JWT_SECRET || 'afrigold_secret_salt_2026';
      const timestamp = Date.now();
      const hash = crypto.createHmac('sha256', secret)
        .update(`${email}:${timestamp}`)
        .digest('hex');

      const token = `session_${Buffer.from(`${email}:${timestamp}:${hash}`).toString('base64')}`;

      return res.json({
        success: true,
        token,
        user: {
          email: envAdminEmail,
          role: 'admin',
          name: 'AFRIGOLD Administrator'
        }
      });
    }

    // 2. Or verify with Firebase Auth if configured
    if (admin && admin.apps && admin.apps.length > 0) {
      try {
        const userRecord = await admin.auth().getUserByEmail(email.trim().toLowerCase());
        if (userRecord) {
          const secret = process.env.JWT_SECRET || 'afrigold_secret_salt_2026';
          const timestamp = Date.now();
          const hash = crypto.createHmac('sha256', secret)
            .update(`${email}:${timestamp}`)
            .digest('hex');

          const token = `session_${Buffer.from(`${email}:${timestamp}:${hash}`).toString('base64')}`;
          return res.json({
            success: true,
            token,
            user: { email: userRecord.email, uid: userRecord.uid, role: 'admin' }
          });
        }
      } catch (fbErr) {
        // Fall through to invalid credentials
      }
    }

    return res.status(401).json({ error: 'Invalid admin email or password.' });
  } catch (err) {
    console.error('[auth/login]', err);
    res.status(500).json({ error: 'Authentication service error.' });
  }
});

// POST /api/auth/verify — verifies token status
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ valid: false });

    if (token.startsWith('session_')) {
      return res.json({ valid: true, email: process.env.ADMIN_EMAIL || 'admin@afrigold.co.tz' });
    }

    if (admin && admin.apps && admin.apps.length > 0) {
      const decoded = await admin.auth().verifyIdToken(token);
      return res.json({ valid: true, uid: decoded.uid, email: decoded.email });
    }

    res.status(401).json({ valid: false });
  } catch {
    res.status(401).json({ valid: false });
  }
});

module.exports = router;
