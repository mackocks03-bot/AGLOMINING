// ============================================================
// Route: /api/images
// Real Firebase Cloud Storage + Local Media Store Fallback
// ============================================================
const express  = require('express');
const router   = express.Router();
const multer   = require('multer');
const fs       = require('fs');
const path     = require('path');
const requireAuth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const {
  cloudUploadImage,
  cloudDeleteImage,
  cloudSaveImageMeta,
  cloudGetImages,
  cloudDeleteImageMeta,
} = require('../firebase-cloud');

const UPLOADS_DIR = path.join(__dirname, '../public/uploads');
const DATA_DIR = path.join(__dirname, '../data');
const LOCAL_IMAGES_FILE = path.join(DATA_DIR, 'images.json');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(LOCAL_IMAGES_FILE)) {
  fs.writeFileSync(LOCAL_IMAGES_FILE, JSON.stringify([]));
}

function getLocalImages() {
  try {
    return JSON.parse(fs.readFileSync(LOCAL_IMAGES_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveLocalImages(imgs) {
  fs.writeFileSync(LOCAL_IMAGES_FILE, JSON.stringify(imgs, null, 2));
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
});

// GET /api/images — list all images
router.get('/', async (req, res) => {
  try {
    try {
      const cloudImgs = await cloudGetImages();
      if (cloudImgs && cloudImgs.length > 0) {
        return res.json({ images: cloudImgs });
      }
    } catch (e) {}

    const images = getLocalImages();
    res.json({ images });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images.' });
  }
});

// GET /api/images/section/:section — images by section
router.get('/section/:section', async (req, res) => {
  try {
    const { section } = req.params;
    try {
      const cloudImgs = await cloudGetImages();
      if (cloudImgs && cloudImgs.length > 0) {
        return res.json({ images: cloudImgs.filter((img) => img.section === section) });
      }
    } catch (e) {}

    const images = getLocalImages().filter((img) => img.section === section);
    res.json({ images });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images.' });
  }
});

// POST /api/images — upload image (admin only)
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image file provided.' });

    const { section = 'general', altText = '' } = req.body;
    const ext = req.file.originalname.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    const storagePath = `images/${section}/${filename}`;

    let imageUrl = '';

    // 1. Try Firebase Cloud Storage
    try {
      imageUrl = await cloudUploadImage(storagePath, req.file.buffer, req.file.mimetype);
    } catch (storageErr) {
      console.warn('Firebase Cloud Storage notice:', storageErr.message);
    }

    // 2. Save locally as persistent backup / fallback
    const localFilePath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(localFilePath, req.file.buffer);

    if (!imageUrl) {
      imageUrl = `/uploads/${filename}`;
    }

    const record = {
      id: uuidv4(),
      url: imageUrl,
      storagePath,
      filename: req.file.originalname,
      section,
      altText,
      uploadedAt: new Date().toISOString(),
      size: req.file.size,
      mimeType: req.file.mimetype,
    };

    // Save image metadata to Firebase Cloud
    try {
      await cloudSaveImageMeta(record);
    } catch (e) {}

    const localImgs = getLocalImages();
    localImgs.unshift(record);
    saveLocalImages(localImgs);

    res.status(201).json({ success: true, image: record });
  } catch (err) {
    console.error('[images/POST]', err);
    res.status(500).json({ error: 'Upload failed: ' + err.message });
  }
});

// DELETE /api/images/:id — delete image (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const localImgs = getLocalImages();
    const target = localImgs.find((img) => img.id === id || img.firestoreId === id);

    if (target && target.storagePath) {
      try {
        await cloudDeleteImage(target.storagePath);
      } catch (err) {
        console.warn('Cloud delete notice:', err.message);
      }
    }

    try {
      await cloudDeleteImageMeta(id);
    } catch (e) {}

    if (target && target.url && target.url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../public', target.url);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch {}
      }
    }

    const filtered = localImgs.filter((img) => img.id !== id && img.firestoreId !== id);
    saveLocalImages(filtered);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete image.' });
  }
});

module.exports = router;
