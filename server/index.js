// ============================================================
// AFRIGOLD AND MINING INV. CO. LIMITED
// Express Backend — Main Server
// ============================================================
require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const path       = require('path');
const rateLimit  = require('express-rate-limit');

const app = express();

// ── Security & Middleware ────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ── Global Rate Limiting ─────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Contact form stricter rate limit
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many messages submitted. Please try again in an hour.' }
});

// ── Routes ───────────────────────────────────────────────────
app.use('/api/messages', contactLimiter, require('./routes/messages'));
app.use('/api/content',  require('./routes/content'));
app.use('/api/images',   require('./routes/images'));
app.use('/api/auth',     require('./routes/auth'));

// ── Serve React build ─────────────────────────────────────────
const fs = require('fs');
const clientDistPath = path.join(__dirname, '../client/dist');
const serverPublicPath = path.join(__dirname, 'public');
const publicPath = fs.existsSync(clientDistPath) ? clientDistPath : serverPublicPath;
app.use(express.static(publicPath));

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// All other GET requests route to React index.html
app.get('*', (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');
  if (path.extname(req.path)) {
    return res.status(404).end();
  }
  res.sendFile(indexPath);
});

// ── Error handler ────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🏗️  AFRIGOLD Server running on http://localhost:${PORT}`);
  console.log(`📊  API base: http://localhost:${PORT}/api\n`);
});

