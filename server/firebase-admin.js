// ============================================================
// Firebase Admin SDK initializer
// Credentials come from .env OR serviceAccountKey.json file — NEVER from the frontend
// ============================================================
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let db, storage, bucket;

function initFirebase() {
  if (admin.apps.length) return;

  // 1. Check for serviceAccountKey.json in server/ or project root
  const candidates = [
    path.join(__dirname, 'serviceAccountKey.json'),
    path.join(__dirname, '../serviceAccountKey.json'),
    path.join(__dirname, 'service-account.json'),
  ];

  let serviceAccount = null;
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      try {
        serviceAccount = JSON.parse(fs.readFileSync(p, 'utf8'));
        console.log(`📁 Found Firebase Service Account JSON at: ${p}`);
        break;
      } catch (e) {}
    }
  }

  if (serviceAccount) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || serviceAccount.project_id + '.firebasestorage.app',
      });
      db      = admin.firestore();
      bucket  = admin.storage().bucket();
      storage = admin.storage();
      console.log('🔥 Firebase Admin successfully initialized via serviceAccountKey.json!');
      return;
    } catch (err) {
      console.warn('⚠️  Firebase Admin init from file failed:', err.message);
    }
  }

  // 2. Check for environment variables in .env
  const rawKey = process.env.FIREBASE_PRIVATE_KEY;
  const privateKey = rawKey ? rawKey.replace(/\\n/g, '\n') : undefined;

  const hasValidCreds =
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_PROJECT_ID !== 'YOUR_PROJECT_ID' &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_CLIENT_EMAIL !== 'YOUR_CLIENT_EMAIL' &&
    privateKey &&
    privateKey.includes('PRIVATE KEY');

  if (!hasValidCreds) {
    console.log('ℹ️  Firebase Admin SDK idle (serviceAccountKey.json not present). Using Firebase Cloud Client & Realtime Database sync.');
    return;
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId:   process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    db      = admin.firestore();
    bucket  = admin.storage().bucket();
    storage = admin.storage();

    console.log('🔥 Firebase Admin successfully initialized from .env credentials!');
  } catch (err) {
    console.warn('⚠️  Firebase Admin initialization failed:', err.message);
  }
}

initFirebase();

module.exports = { admin, get db() { return db; }, get bucket() { return bucket; } };
