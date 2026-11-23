# AGLOMINING

Official web application and administration portal for **AFRIGOLD AND MINING INV. CO. LIMITED** — a pioneering gold mining leader headquartered in Chunya, Mbeya, United Republic of Tanzania.

---

## 🌟 Overview

- **Full-Stack Architecture:** React (Vite) frontend + Express.js backend.
- **Real Firebase Integration:** Cloud Firestore & Realtime Database sync.
- **Admin Dashboard:** Secure portal at `/admin` for reading client messages, editing site content dynamically, and uploading operations imagery.
- **Zero Frontend Secrets:** All credentials, API keys, and sensitive tokens reside strictly in `server/.env`.
- **Tanzania First:** Designed for Tanzanian gold mining operations adhering to OSHA 2003, local content regulations, and zero-harm environmental standards.

---

## 🚀 Quick Start

### 1. Installation
Install dependencies for both root, server, and client:
```bash
npm run install:all
```

### 2. Configure Environment
Copy `.env.example` to `server/.env` and insert your Firebase & Admin credentials:
```bash
cp server/.env.example server/.env
```

### 3. Start Development Server
```bash
npm run dev
```
- Web Application: `http://localhost:3000` (or `http://localhost:5000` via Express)
- Admin Portal: `http://localhost:5000/admin`

---

## 🏗️ Project Structure

```
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/  # 13 corporate sections + Admin components
│   │   ├── context/     # Auth Context (session-based)
│   │   ├── hooks/       # API hooks for messages, content & images
│   │   └── pages/       # MainSite & AdminPage
├── server/              # Express backend
│   ├── middleware/      # Authentication & rate-limiting middleware
│   ├── routes/          # /api/messages, /api/content, /api/images, /api/auth
│   ├── firebase-cloud.js# Realtime Database & Firestore cloud engine
│   └── index.js         # Main server entrypoint
└── START_SERVER.bat     # Windows 1-click launcher
```

---

## 🔐 Admin Authentication
- **Default Login:** `admin@afrigold.co.tz`
- **Dashboard:** `/admin`

---

## 📄 License
Copyright © 2026 AFRIGOLD AND MINING INV. CO. LIMITED. All rights reserved.
