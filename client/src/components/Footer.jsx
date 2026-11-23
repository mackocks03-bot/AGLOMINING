import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ content }) {
  const office = content?.address || 'P.O. Box 171, Chunya, Mbeya, Tanzania';
  const email = content?.email || 'info@afrigold.co.tz';

  return (
    <footer style={{ background: '#070707', borderTop: '1px solid rgba(201, 168, 76, 0.25)', padding: '80px 0 35px' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <img
                src="/LOGO.jpeg"
                alt="AFRIGOLD Logo"
                style={{ width: '45px', height: '45px', borderRadius: '8px', border: '1.5px solid #c9a84c' }}
              />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--ff-head)',
                    fontWeight: 800,
                    fontSize: '1.35rem',
                    color: 'var(--gold-bright)',
                    lineHeight: 1.1,
                  }}
                >
                  AFRIGOLD
                </div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                  & Mining Inv. Co. Limited
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--white-60)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Transforming natural resources into sustainable human development and nation-building tools for Tanzania and humanity.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['🌐', '💼', '📧', '📱'].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--black-card)',
                    border: '1px solid rgba(201, 168, 76, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    color: 'var(--gold-bright)',
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{ fontFamily: 'var(--ff-head)', color: 'var(--gold-bright)', fontSize: '1.2rem', marginBottom: '1.25rem' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Corporate History', href: '#history' },
                { label: 'About Our Facilities', href: '#about' },
                { label: 'Managing Director Note', href: '#leadership' },
                { label: 'Core Values & Ethics', href: '#values' },
                { label: 'Health & Safety (OSHA)', href: '#health-safety' },
                { label: 'Environmental Practices', href: '#environment' },
                { label: 'CSR Community Impact', href: '#csr' },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  style={{ color: 'var(--white-80)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--gold-bright)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--white-80)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Operations & Admin */}
          <div>
            <h4 style={{ fontFamily: 'var(--ff-head)', color: 'var(--gold-bright)', fontSize: '1.2rem', marginBottom: '1.25rem' }}>
              Operations & Portals
            </h4>
            <p style={{ color: 'var(--white-80)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              📍 <strong>Location:</strong> {office}
            </p>
            <p style={{ color: 'var(--white-80)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              📧 <strong>Inquiries:</strong> {email}
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem' }}>
              <Link
                to="/admin"
                className="btn btn-outline"
                style={{
                  padding: '0.6rem 1.4rem',
                  fontSize: '0.85rem',
                  borderRadius: '30px',
                  display: 'inline-flex',
                }}
              >
                🔐 Admin Control Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            color: 'var(--white-60)',
            fontSize: '0.85rem',
          }}
        >
          <div>
            © 2026 AFRIGOLD AND MINING INV. CO. LIMITED. All Rights Reserved.
          </div>
          <div>
            Chunya, Mbeya, United Republic of Tanzania
          </div>
        </div>
      </div>
    </footer>
  );
}

