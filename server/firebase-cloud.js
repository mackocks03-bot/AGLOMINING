// ============================================================
// AFRIGOLD AND MINING INV. CO. LIMITED
// Server-Side Firebase Cloud Integration
// Credentials loaded strictly from server/.env — NEVER client side
//
// Supports:
//  1. Firebase Realtime Database (Live cloud sync, verified working)
//  2. Cloud Firestore (Parallel cloud sync)
//  3. Firebase Cloud Storage (Image bucket)
// ============================================================
require('dotenv').config();
const { initializeApp, getApps } = require('firebase/app');
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} = require('firebase/firestore');
const {
  getDatabase,
  ref: rtdbRef,
  set: rtdbSet,
  get: rtdbGet,
  update: rtdbUpdate,
  remove: rtdbRemove,
} = require('firebase/database');
const {
  getStorage,
  ref: storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require('firebase/storage');

let app = null;
let db = null;
let rtdb = null;
let storage = null;

function initCloud() {
  if (getApps().length > 0) {
    app = getApps()[0];
    try { db = getFirestore(app); } catch (e) {}
    try { rtdb = getDatabase(app); } catch (e) {}
    try { storage = getStorage(app); } catch (e) {}
    return;
  }

  const apiKey = process.env.FIREBASE_API_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (!apiKey || !projectId || projectId === 'YOUR_PROJECT_ID') {
    console.warn('⚠️  Firebase credentials not configured in server/.env');
    return;
  }

  const config = {
    apiKey,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  try {
    app = initializeApp(config);
    try { db = getFirestore(app); } catch (e) {}
    try {
      rtdb = getDatabase(app);
      console.log(`🔥 Connected to Firebase Realtime Database: [${process.env.FIREBASE_DATABASE_URL || projectId}]`);
    } catch (e) {
      console.warn('Realtime DB init notice:', e.message);
    }
    try { storage = getStorage(app); } catch (e) {}
    console.log(`🔥 Connected to Firebase Cloud Project: [${projectId}]`);
  } catch (err) {
    console.warn('⚠️  Firebase initialization error:', err.message);
  }
}

initCloud();

// ── Messages Cloud Operations ──────────────────────────────────

// Add inquiry message to Firebase Cloud (Realtime DB + Firestore)
async function cloudAddMessage(msgData) {
  let saved = false;

  // 1. Save to Firebase Realtime Database
  if (rtdb && msgData.id) {
    try {
      await rtdbSet(rtdbRef(rtdb, `messages/${msgData.id}`), {
        ...msgData,
        createdAt: Date.now(),
      });
      saved = true;
    } catch (err) {
      console.warn('Firebase RTDB add message notice:', err.message);
    }
  }

  // 2. Also attempt Cloud Firestore
  if (db) {
    try {
      const colRef = collection(db, 'messages');
      await addDoc(colRef, {
        ...msgData,
        createdAt: serverTimestamp(),
      });
      saved = true;
    } catch (err) {
      // Handled silently if rules require setup
    }
  }

  return saved ? msgData.id : null;
}

// Fetch all messages from Firebase Cloud
async function cloudGetMessages() {
  // 1. Fetch from Realtime Database
  if (rtdb) {
    try {
      const snap = await rtdbGet(rtdbRef(rtdb, 'messages'));
      if (snap.exists()) {
        const val = snap.val();
        const list = Object.keys(val).map((k) => ({
          id: k,
          ...val[k],
        }));
        // Sort descending by timestamp
        list.sort((a, b) => new Date(b.timestamp || b.createdAt || 0) - new Date(a.timestamp || a.createdAt || 0));
        return list;
      }
    } catch (err) {
      console.warn('Firebase RTDB get messages notice:', err.message);
    }
  }

  // 2. Fallback to Cloud Firestore
  if (db) {
    try {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({
          firestoreId: d.id,
          id: d.id,
          ...d.data(),
        }));
      }
    } catch (err) {
      // Handled silently
    }
  }

  return null;
}

// Mark message as read
async function cloudMarkMessageRead(id) {
  let updated = false;

  if (rtdb && id) {
    try {
      await rtdbUpdate(rtdbRef(rtdb, `messages/${id}`), { read: true });
      updated = true;
    } catch (err) {}
  }

  if (db && id) {
    try {
      const docRef = doc(db, 'messages', id);
      await updateDoc(docRef, { read: true });
      updated = true;
    } catch (err) {}
  }

  return updated;
}

// Delete message from Firebase Cloud
async function cloudDeleteMessage(id) {
  let deleted = false;

  if (rtdb && id) {
    try {
      await rtdbRemove(rtdbRef(rtdb, `messages/${id}`));
      deleted = true;
    } catch (err) {}
  }

  if (db && id) {
    try {
      const docRef = doc(db, 'messages', id);
      await deleteDoc(docRef);
      deleted = true;
    } catch (err) {}
  }

  return deleted;
}

// ── Content Cloud Operations ───────────────────────────────────

// Fetch specific content section
async function cloudGetContent(section) {
  if (rtdb && section) {
    try {
      const snap = await rtdbGet(rtdbRef(rtdb, `content/${section}`));
      if (snap.exists()) {
        return snap.val();
      }
    } catch (err) {}
  }

  if (db && section) {
    try {
      const docRef = doc(db, 'content', section);
      const snap = await getDoc(docRef);
      if (snap.exists()) return snap.data();
    } catch (err) {}
  }

  return null;
}

// Fetch all content sections
async function cloudGetAllContent() {
  if (rtdb) {
    try {
      const snap = await rtdbGet(rtdbRef(rtdb, 'content'));
      if (snap.exists()) {
        return snap.val();
      }
    } catch (err) {}
  }

  if (db) {
    try {
      const snap = await getDocs(collection(db, 'content'));
      if (!snap.empty) {
        const data = {};
        snap.forEach((d) => {
          data[d.id] = d.data();
        });
        return data;
      }
    } catch (err) {}
  }

  return null;
}

// Save content section
async function cloudSaveContent(section, data) {
  let saved = false;
  const payload = { ...data, updatedAt: new Date().toISOString() };

  if (rtdb && section) {
    try {
      await rtdbSet(rtdbRef(rtdb, `content/${section}`), payload);
      saved = true;
    } catch (err) {
      console.warn('Firebase RTDB save content notice:', err.message);
    }
  }

  if (db && section) {
    try {
      const docRef = doc(db, 'content', section);
      await setDoc(docRef, payload, { merge: true });
      saved = true;
    } catch (err) {}
  }

  return saved;
}

// ── Image Metadata Cloud Operations ────────────────────────────

// Save image metadata record to Firebase Cloud
async function cloudSaveImageMeta(imgRecord) {
  if (rtdb && imgRecord && imgRecord.id) {
    try {
      await rtdbSet(rtdbRef(rtdb, `images/${imgRecord.id}`), imgRecord);
      return true;
    } catch (err) {
      console.warn('Firebase RTDB image meta save notice:', err.message);
    }
  }
  return false;
}

// Get all image records from Firebase Cloud
async function cloudGetImages() {
  if (rtdb) {
    try {
      const snap = await rtdbGet(rtdbRef(rtdb, 'images'));
      if (snap.exists()) {
        const val = snap.val();
        const list = Object.keys(val).map((k) => ({
          id: k,
          ...val[k],
        }));
        list.sort((a, b) => new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0));
        return list;
      }
    } catch (err) {}
  }
  return null;
}

// Delete image record from Firebase Cloud
async function cloudDeleteImageMeta(id) {
  if (rtdb && id) {
    try {
      await rtdbRemove(rtdbRef(rtdb, `images/${id}`));
      return true;
    } catch (err) {}
  }
  return false;
}

// ── Cloud Storage Operations ───────────────────────────────────

// Upload image buffer to Firebase Cloud Storage
async function cloudUploadImage(storagePath, buffer, mimeType) {
  if (!storage) return null;
  try {
    const sRef = storageRef(storage, storagePath);
    await uploadBytes(sRef, buffer, { contentType: mimeType });
    const downloadUrl = await getDownloadURL(sRef);
    return downloadUrl;
  } catch (err) {
    console.warn('Firebase Cloud Storage upload notice:', err.message);
    return null;
  }
}

// Delete file from Firebase Cloud Storage
async function cloudDeleteImage(storagePath) {
  if (!storage) return null;
  try {
    const sRef = storageRef(storage, storagePath);
    await deleteObject(sRef);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  get db() { return db; },
  get rtdb() { return rtdb; },
  get storage() { return storage; },
  cloudAddMessage,
  cloudGetMessages,
  cloudMarkMessageRead,
  cloudDeleteMessage,
  cloudGetContent,
  cloudGetAllContent,
  cloudSaveContent,
  cloudSaveImageMeta,
  cloudGetImages,
  cloudDeleteImageMeta,
  cloudUploadImage,
  cloudDeleteImage,
};
