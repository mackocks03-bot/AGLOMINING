import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { submitMessage } from '../hooks/useApi';

export default function Contact({ content }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
    honeypot: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const office = content?.address || 'P.O. Box 171, Chunya, Mbeya, Tanzania';
  const infoEmail = content?.email || 'info@afrigold.co.tz';
  const hrEmail = content?.hrEmail || 'hr@afrigold.co.tz';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      await submitMessage(formData);
      toast.success('Your message has been sent successfully!');
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
        honeypot: '',
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to send message. Please email info@afrigold.co.tz directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '110px 0', background: 'var(--black-deep)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <span className="section-badge">Direct Communication</span>
          <h2 className="section-title">
            Get in <span className="gold">Touch</span>
          </h2>
          <div className="gold-line" style={{ margin: '0 auto 1.5rem' }} />
          <p style={{ color: 'var(--white-80)', fontSize: '1.05rem' }}>
            We welcome inquiries from investors, mining partners, regulatory authorities, and community stakeholders.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          {/* Contact Details */}
          <div className="reveal slide-left">
            <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem' }}>
              Headquarters & Offices
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <div style={{ fontSize: '1.8rem', color: 'var(--gold-bright)' }}>📍</div>
                <div>
                  <h4 style={{ color: 'var(--gold-bright)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>
                    Registered Office
                  </h4>
                  <p style={{ color: 'var(--white-80)', fontSize: '1rem', lineHeight: '1.6' }}>
                    {office}
                  </p>
                  <p style={{ color: 'var(--white-60)', fontSize: '0.85rem' }}>
                    United Republic of Tanzania
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <div style={{ fontSize: '1.8rem', color: 'var(--gold-bright)' }}>📧</div>
                <div>
                  <h4 style={{ color: 'var(--gold-bright)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>
                    General Inquiries
                  </h4>
                  <a
                    href={`mailto:${infoEmail}`}
                    style={{ color: 'var(--white-80)', fontSize: '1rem', textDecoration: 'underline' }}
                  >
                    {infoEmail}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <div style={{ fontSize: '1.8rem', color: 'var(--gold-bright)' }}>👥</div>
                <div>
                  <h4 style={{ color: 'var(--gold-bright)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>
                    Careers & HR
                  </h4>
                  <a
                    href={`mailto:${hrEmail}`}
                    style={{ color: 'var(--white-80)', fontSize: '1rem', textDecoration: 'underline' }}
                  >
                    {hrEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="reveal slide-right"
            style={{
              background: 'linear-gradient(145deg, #161616 0%, #101010 100%)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontFamily: 'var(--ff-head)', color: 'var(--gold-bright)', fontSize: '1.8rem', marginBottom: '1rem' }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--white-80)', marginBottom: '2rem' }}>
                  Thank you for reaching out to AFRIGOLD AND MINING INV. CO. LIMITED. Our team will review your inquiry and respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Honeypot for bot protection */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--white-80)', marginBottom: '0.4rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
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
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold-bright)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--white-80)', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
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
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold-bright)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--white-80)', marginBottom: '0.4rem' }}>
                    Inquiry Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
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
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Investment & Partnership">Investment & Partnership</option>
                    <option value="Gold Trading & Supply">Gold Trading & Supply</option>
                    <option value="Careers & Employment">Careers & Employment</option>
                    <option value="Community & CSR">Community & CSR</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--white-80)', marginBottom: '0.4rem' }}>
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we assist you?"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'var(--black-deep)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold-bright)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}
                >
                  {loading ? 'Submitting to Database...' : 'Submit Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

