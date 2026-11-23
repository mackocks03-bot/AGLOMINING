import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import {
  getMessages,
  markRead,
  deleteMessage,
  getContent,
  updateContent,
  getImages,
  uploadImage,
  deleteImage,
} from '../hooks/useApi';

export default function AdminPage() {
  const { user, login, logout, loading: authLoading, isAuthenticated } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Active tab: 'dashboard' | 'messages' | 'images' | 'content'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Messages state
  const [messages, setMessages] = useState([]);
  const [msgFilter, setMsgFilter] = useState('all');
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Images state
  const [images, setImages] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadSection, setUploadSection] = useState('about');
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploading, setUploading] = useState(false);

  // Content editor state
  const [content, setContent] = useState({
    hero: { title: '', subtitle: '', bgImageUrl: '' },
    history: { paragraph1: '', paragraph2: '' },
    about: { description: '', vision: '', mission: '' },
    leadership: { message: '', mdName: '', mdTitle: '' },
    contact: { address: '', email: '', hrEmail: '' },
  });
  const [savingSection, setSavingSection] = useState('');

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    setLoadingMessages(true);
    try {
      const [msgRes, imgRes, contentRes] = await Promise.allSettled([
        getMessages(),
        getImages(),
        getContent(),
      ]);

      if (msgRes.status === 'fulfilled') {
        setMessages(msgRes.value.data?.messages || []);
      }
      if (imgRes.status === 'fulfilled') {
        setImages(imgRes.value.data?.images || []);
      }
      if (contentRes.status === 'fulfilled') {
        const d = contentRes.value.data?.data || {};
        setContent((prev) => ({
          hero: { ...prev.hero, ...(d.hero || {}) },
          history: { ...prev.history, ...(d.history || {}) },
          about: { ...prev.about, ...(d.about || {}) },
          leadership: { ...prev.leadership, ...(d.leadership || d.md_message || {}) },
          contact: { ...prev.contact, ...(d.contact || {}) },
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginSubmitting(true);
    try {
      await login(loginEmail, loginPassword);
      toast.success('Welcome back, Admin!');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markRead(id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id || m.firestoreId === id ? { ...m, read: true } : m))
      );
      toast.success('Marked as read');
    } catch {
      toast.error('Failed to update message status');
    }
  };

  const handleDeleteMsg = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id && m.firestoreId !== id));
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete message');
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      toast.error('Please select an image file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', uploadFile);
    formData.append('section', uploadSection);
    formData.append('altText', uploadAlt);

    setUploading(true);
    try {
      const res = await uploadImage(formData);
      toast.success('Image successfully uploaded to database!');
      if (res.data?.image) {
        setImages((prev) => [res.data.image, ...prev]);
      } else {
        loadAllData();
      }
      setUploadFile(null);
      setUploadAlt('');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Delete this image from storage?')) return;
    try {
      await deleteImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id && img.firestoreId !== id));
      toast.success('Image deleted from storage');
    } catch {
      toast.error('Failed to delete image');
    }
  };

  const handleSaveContent = async (sectionName) => {
    setSavingSection(sectionName);
    try {
      await updateContent(sectionName, content[sectionName]);
      toast.success(`Updated ${sectionName.toUpperCase()} section successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save section content');
    } finally {
      setSavingSection('');
    }
  };

  // If not logged in, render the login card
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at center, #181818 0%, #0a0a0a 100%)',
          padding: '2rem',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '440px',
            background: 'linear-gradient(145deg, #161616 0%, #101010 100%)',
            border: '1.5px solid rgba(240, 192, 64, 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
            textAlign: 'center',
          }}
        >
          <img
            src="/LOGO.jpeg"
            alt="AFRIGOLD Logo"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              margin: '0 auto 1.5rem',
              border: '2px solid var(--gold-mid)',
            }}
          />

          <h2 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.8rem', color: 'var(--gold-bright)', marginBottom: '0.4rem' }}>
            AFRIGOLD Admin
          </h2>
          <p style={{ color: 'var(--white-60)', fontSize: '0.85rem', marginBottom: '2rem' }}>
            Secure Real Database Management Portal
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@afrigold.co.tz"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: 'var(--black-deep)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: 'var(--black-deep)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="btn btn-gold"
              style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
            >
              {loginSubmitting ? 'Authenticating...' : 'Sign In to Dashboard →'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
            <Link to="/" style={{ color: 'var(--gold-mid)', fontSize: '0.85rem' }}>
              ← Return to Main Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;
  const filteredMessages =
    msgFilter === 'unread'
      ? messages.filter((m) => !m.read)
      : msgFilter === 'read'
      ? messages.filter((m) => m.read)
      : messages;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--black-deep)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          background: 'var(--black-mid)',
          borderRight: '1px solid rgba(201, 168, 76, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <img
            src="/LOGO.jpeg"
            alt="Logo"
            style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1.5px solid #c9a84c' }}
          />
          <div>
            <div style={{ fontFamily: 'var(--ff-head)', fontWeight: 800, color: 'var(--gold-bright)', fontSize: '1.15rem' }}>
              AFRIGOLD
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--white-60)', textTransform: 'uppercase' }}>
              Database Console
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard', badge: null },
            { id: 'messages', label: '💬 Messages', badge: unreadCount > 0 ? unreadCount : null },
            { id: 'images', label: '🖼️ Image Manager', badge: images.length },
            { id: 'content', label: '✏️ Content Editor', badge: null },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: activeTab === item.id ? 'var(--black-deep)' : 'var(--white-80)',
                background: activeTab === item.id ? 'linear-gradient(135deg, var(--gold-mid), var(--gold-bright))' : 'transparent',
                textAlign: 'left',
                transition: 'all 0.25s',
              }}
            >
              <span>{item.label}</span>
              {item.badge !== null && (
                <span
                  style={{
                    background: activeTab === item.id ? 'var(--black-deep)' : 'var(--gold-bright)',
                    color: activeTab === item.id ? 'var(--gold-bright)' : 'var(--black-deep)',
                    padding: '0.15rem 0.55rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Footer controls */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link
            to="/"
            target="_blank"
            style={{
              color: 'var(--gold-mid)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            ↗ View Public Website
          </Link>

          <button
            onClick={logout}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#ef4444',
              fontSize: '0.85rem',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main style={{ flex: 1, padding: '2.5rem 3rem', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--ff-head)', fontSize: '2.2rem', color: '#fff', marginBottom: '0.25rem' }}>
              {activeTab === 'dashboard' && 'Operations Dashboard'}
              {activeTab === 'messages' && 'Client Messages & Inquiries'}
              {activeTab === 'images' && 'Image Storage & Media Library'}
              {activeTab === 'content' && 'Live Website Content Management'}
            </h1>
            <p style={{ color: 'var(--white-60)', fontSize: '0.9rem' }}>
              Logged in as {user?.email || 'admin@afrigold.co.tz'}
            </p>
          </div>

          <button
            onClick={loadAllData}
            className="btn btn-outline"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem', borderRadius: '30px' }}
          >
            🔄 Refresh Database
          </button>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: 'var(--black-card)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 'var(--radius)', padding: '1.75rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--white-60)', textTransform: 'uppercase' }}>Total Inquiries</div>
                <div style={{ fontFamily: 'var(--ff-head)', fontSize: '2.5rem', color: 'var(--gold-bright)', fontWeight: 800 }}>
                  {messages.length}
                </div>
              </div>
              <div style={{ background: 'var(--black-card)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 'var(--radius)', padding: '1.75rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--white-60)', textTransform: 'uppercase' }}>Unread Inquiries</div>
                <div style={{ fontFamily: 'var(--ff-head)', fontSize: '2.5rem', color: '#f59e0b', fontWeight: 800 }}>
                  {unreadCount}
                </div>
              </div>
              <div style={{ background: 'var(--black-card)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 'var(--radius)', padding: '1.75rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--white-60)', textTransform: 'uppercase' }}>Media in Storage</div>
                <div style={{ fontFamily: 'var(--ff-head)', fontSize: '2.5rem', color: '#38bdf8', fontWeight: 800 }}>
                  {images.length}
                </div>
              </div>
              <div style={{ background: 'var(--black-card)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 'var(--radius)', padding: '1.75rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--white-60)', textTransform: 'uppercase' }}>Backend Status</div>
                <div style={{ fontSize: '1.4rem', color: '#22c55e', fontWeight: 700, marginTop: '0.5rem' }}>
                  ● Online & Active
                </div>
              </div>
            </div>

            {/* Quick Recent Messages */}
            <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.4rem', color: 'var(--gold-bright)', marginBottom: '1.25rem' }}>
              Recent Inquiries
            </h3>
            {messages.length === 0 ? (
              <p style={{ color: 'var(--white-60)' }}>No inquiries submitted yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.slice(0, 3).map((msg) => (
                  <div
                    key={msg.id || msg.firestoreId}
                    style={{
                      background: 'var(--black-card)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--radius)',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{msg.name} ({msg.email})</div>
                      <div style={{ color: 'var(--gold-pale)', fontSize: '0.85rem' }}>{msg.subject}</div>
                      <div style={{ color: 'var(--white-60)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                        {msg.message.substring(0, 100)}...
                      </div>
                    </div>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: msg.read ? 'rgba(255,255,255,0.1)' : 'rgba(240, 192, 64, 0.2)',
                        color: msg.read ? 'var(--white-60)' : 'var(--gold-bright)',
                      }}
                    >
                      {msg.read ? 'Read' : 'New'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MESSAGES */}
        {activeTab === 'messages' && (
          <div>
            {/* Filter buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {['all', 'unread', 'read'].map((f) => (
                <button
                  key={f}
                  onClick={() => setMsgFilter(f)}
                  style={{
                    padding: '0.45rem 1.25rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    textTransform: 'capitalize',
                    background: msgFilter === f ? 'var(--gold-bright)' : 'var(--black-card)',
                    color: msgFilter === f ? 'var(--black-deep)' : '#fff',
                    border: '1px solid rgba(201,168,76,0.3)',
                    fontWeight: 600,
                  }}
                >
                  {f} {f === 'unread' && unreadCount > 0 ? `(${unreadCount})` : ''}
                </button>
              ))}
            </div>

            {loadingMessages ? (
              <p style={{ color: 'var(--white-60)' }}>Loading messages from database...</p>
            ) : filteredMessages.length === 0 ? (
              <div style={{ background: 'var(--black-card)', padding: '3rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <p style={{ color: 'var(--white-60)' }}>No messages found in this view.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id || msg.firestoreId}
                    style={{
                      background: 'var(--black-card)',
                      border: msg.read ? '1px solid rgba(255,255,255,0.1)' : '1.5px solid var(--gold-bright)',
                      borderRadius: 'var(--radius)',
                      padding: '1.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.2rem' }}>
                          {msg.name}
                        </h4>
                        <a href={`mailto:${msg.email}`} style={{ color: 'var(--gold-bright)', fontSize: '0.9rem' }}>
                          {msg.email}
                        </a>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {!msg.read && (
                          <button
                            onClick={() => handleMarkRead(msg.id || msg.firestoreId)}
                            style={{
                              padding: '0.4rem 0.85rem',
                              borderRadius: '6px',
                              background: 'rgba(240, 192, 64, 0.15)',
                              color: 'var(--gold-bright)',
                              border: '1px solid var(--gold-mid)',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                            }}
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMsg(msg.id || msg.firestoreId)}
                          style={{
                            padding: '0.4rem 0.85rem',
                            borderRadius: '6px',
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#ef4444',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                      <span style={{ color: 'var(--white-60)', fontSize: '0.8rem' }}>Subject: </span>
                      <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{msg.subject}</strong>
                    </div>

                    <p style={{ color: 'var(--white-80)', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                      {msg.message}
                    </p>

                    <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--white-60)' }}>
                      <span>Submitted: {new Date(msg.timestamp).toLocaleString()}</span>
                      {msg.ip && <span>IP: {msg.ip}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: IMAGE MANAGER */}
        {activeTab === 'images' && (
          <div>
            {/* Upload Box */}
            <div
              style={{
                background: 'var(--black-card)',
                border: '1.5px dashed rgba(201, 168, 76, 0.4)',
                borderRadius: 'var(--radius)',
                padding: '2.5rem',
                marginBottom: '3rem',
              }}
            >
              <h3 style={{ fontFamily: 'var(--ff-head)', color: 'var(--gold-bright)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>
                Upload New Image to Storage
              </h3>

              <form onSubmit={handleUploadImage} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Select Image File
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      background: 'var(--black-deep)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Assign Section
                  </label>
                  <select
                    value={uploadSection}
                    onChange={(e) => setUploadSection(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--black-deep)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.85rem',
                    }}
                  >
                    <option value="hero">Hero Background</option>
                    <option value="about">About Us Facility</option>
                    <option value="history">History Extraction</option>
                    <option value="operations">Operations & Heavy Equipment</option>
                    <option value="general">General Media</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Caption / Alt Text
                  </label>
                  <input
                    type="text"
                    value={uploadAlt}
                    onChange={(e) => setUploadAlt(e.target.value)}
                    placeholder="e.g. Gold Bars In Chunya Vault"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--black-deep)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="btn btn-gold"
                  style={{ height: '46px', padding: '0 1.5rem' }}
                >
                  {uploading ? 'Uploading...' : 'Upload Image →'}
                </button>
              </form>
            </div>

            {/* Gallery Grid */}
            <h3 style={{ fontFamily: 'var(--ff-head)', color: 'var(--gold-bright)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>
              Media Library ({images.length} files)
            </h3>

            {images.length === 0 ? (
              <p style={{ color: 'var(--white-60)' }}>No custom uploaded images yet. Use the upload box above.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                {images.map((img) => (
                  <div
                    key={img.id || img.firestoreId}
                    style={{
                      background: 'var(--black-card)',
                      borderRadius: 'var(--radius)',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <div style={{ height: '170px', overflow: 'hidden' }}>
                      <img src={img.url} alt={img.altText || 'Media'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span
                          style={{
                            background: 'rgba(201,168,76,0.15)',
                            color: 'var(--gold-bright)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '12px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                          }}
                        >
                          {img.section}
                        </span>
                        <button
                          onClick={() => handleDeleteImage(img.id || img.firestoreId)}
                          style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}
                        >
                          Delete
                        </button>
                      </div>
                      <div style={{ color: 'var(--white-80)', fontSize: '0.82rem', wordBreak: 'break-all' }}>
                        {img.filename}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CONTENT EDITOR */}
        {activeTab === 'content' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* HERO SECTION */}
            <div style={{ background: 'var(--black-card)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 'var(--radius)', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--ff-head)', color: 'var(--gold-bright)', fontSize: '1.3rem' }}>
                  Hero Section
                </h3>
                <button
                  onClick={() => handleSaveContent('hero')}
                  className="btn btn-gold"
                  style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
                >
                  {savingSection === 'hero' ? 'Saving...' : 'Save Hero'}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Main Headline Title
                  </label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                    placeholder="AFRIGOLD AND MINING INV. CO. LIMITED"
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Subtitle Tagline
                  </label>
                  <input
                    type="text"
                    value={content.hero.subtitle}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                    placeholder="Transforming Natural Resources Into Sustainable Human Development"
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Hero Background Image URL (optional)
                  </label>
                  <input
                    type="text"
                    value={content.hero.bgImageUrl}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, bgImageUrl: e.target.value } })}
                    placeholder="https://..."
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>
            </div>

            {/* HISTORY SECTION */}
            <div style={{ background: 'var(--black-card)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 'var(--radius)', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--ff-head)', color: 'var(--gold-bright)', fontSize: '1.3rem' }}>
                  History & Evolution
                </h3>
                <button
                  onClick={() => handleSaveContent('history')}
                  className="btn btn-gold"
                  style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
                >
                  {savingSection === 'history' ? 'Saving...' : 'Save History'}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Paragraph 1 (Founding & Opportunity)
                  </label>
                  <textarea
                    rows={3}
                    value={content.history.paragraph1}
                    onChange={(e) => setContent({ ...content, history: { ...content.history, paragraph1: e.target.value } })}
                    placeholder="Tanzania has a thriving mining industry, and gold mining is a potential driver of economic development..."
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Paragraph 2 (Key Extraction & Concentrates)
                  </label>
                  <textarea
                    rows={3}
                    value={content.history.paragraph2}
                    onChange={(e) => setContent({ ...content, history: { ...content.history, paragraph2: e.target.value } })}
                    placeholder="In 2026, recognizing that Tanzania is a land of endless opportunities for mining..."
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>
            </div>

            {/* ABOUT SECTION */}
            <div style={{ background: 'var(--black-card)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 'var(--radius)', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--ff-head)', color: 'var(--gold-bright)', fontSize: '1.3rem' }}>
                  About Us (Vision & Mission)
                </h3>
                <button
                  onClick={() => handleSaveContent('about')}
                  className="btn btn-gold"
                  style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
                >
                  {savingSection === 'about' ? 'Saving...' : 'Save About'}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Company Description
                  </label>
                  <textarea
                    rows={3}
                    value={content.about.description}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, description: e.target.value } })}
                    placeholder="AFRIGOLD AND MINING INV. CO. LIMITED is a pioneering gold mining leader..."
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Vision Statement
                  </label>
                  <input
                    type="text"
                    value={content.about.vision}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, vision: e.target.value } })}
                    placeholder="To be the most responsible and largest gold mining corporation..."
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Mission Statement
                  </label>
                  <input
                    type="text"
                    value={content.about.mission}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, mission: e.target.value } })}
                    placeholder="To deliver incredible synergy and enduring value..."
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>
            </div>

            {/* MANAGING DIRECTOR SECTION */}
            <div style={{ background: 'var(--black-card)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 'var(--radius)', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--ff-head)', color: 'var(--gold-bright)', fontSize: '1.3rem' }}>
                  Managing Director Note
                </h3>
                <button
                  onClick={() => handleSaveContent('leadership')}
                  className="btn btn-gold"
                  style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
                >
                  {savingSection === 'leadership' ? 'Saving...' : 'Save Message'}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Full Keynote Message
                  </label>
                  <textarea
                    rows={5}
                    value={content.leadership.message}
                    onChange={(e) => setContent({ ...content, leadership: { ...content.leadership, message: e.target.value } })}
                    placeholder="A hearty welcome to AFRIGOLD AND MINING INV. CO. LIMITED..."
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                      Signatory Name
                    </label>
                    <input
                      type="text"
                      value={content.leadership.mdName}
                      onChange={(e) => setContent({ ...content, leadership: { ...content.leadership, mdName: e.target.value } })}
                      placeholder="Managing Director"
                      style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                      Signatory Designation
                    </label>
                    <input
                      type="text"
                      value={content.leadership.mdTitle}
                      onChange={(e) => setContent({ ...content, leadership: { ...content.leadership, mdTitle: e.target.value } })}
                      placeholder="AFRIGOLD AND MINING INV. CO. LIMITED"
                      style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT DETAILS */}
            <div style={{ background: 'var(--black-card)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 'var(--radius)', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--ff-head)', color: 'var(--gold-bright)', fontSize: '1.3rem' }}>
                  Headquarters & Inquiries Contact
                </h3>
                <button
                  onClick={() => handleSaveContent('contact')}
                  className="btn btn-gold"
                  style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
                >
                  {savingSection === 'contact' ? 'Saving...' : 'Save Contact'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Registered Address
                  </label>
                  <input
                    type="text"
                    value={content.contact.address}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })}
                    placeholder="P.O. Box 171, Chunya, Mbeya, Tanzania"
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Inquiries Email
                  </label>
                  <input
                    type="email"
                    value={content.contact.email}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                    placeholder="info@afrigold.co.tz"
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--white-80)', marginBottom: '0.35rem' }}>
                    Careers & HR Email
                  </label>
                  <input
                    type="email"
                    value={content.contact.hrEmail}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, hrEmail: e.target.value } })}
                    placeholder="hr@afrigold.co.tz"
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--black-deep)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

