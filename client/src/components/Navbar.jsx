import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'history', 'about', 'leadership', 'values', 'health-safety', 'environment', 'csr', 'workforce', 'careers', 'contact'];
      const scrollPos = window.scrollY + 150;

      for (let s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'History', href: '#history' },
    { label: 'About', href: '#about' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Values', href: '#values' },
    { label: 'Health & Safety', href: '#health-safety' },
    { label: 'Environment', href: '#environment' },
    { label: 'CSR', href: '#csr' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.3)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(201, 168, 76, 0.3)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand / Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <img
            src="/LOGO.jpeg"
            alt="AFRIGOLD Logo"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              objectFit: 'cover',
              border: '1.5px solid #c9a84c',
            }}
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--ff-head)',
                fontWeight: 800,
                fontSize: '1.3rem',
                letterSpacing: '0.04em',
                background: 'linear-gradient(135deg, #f0c040, #c9a84c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
              }}
            >
              AFRIGOLD
            </div>
            <div
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              & Mining Inv. Co. Limited
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }} className="desktop-nav">
          {navLinks.map((link) => {
            const secId = link.href.replace('#', '');
            const isActive = activeSection === secId;
            return (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: isActive ? '#f0c040' : 'rgba(255, 255, 255, 0.85)',
                  borderBottom: isActive ? '2px solid #f0c040' : '2px solid transparent',
                  paddingBottom: '4px',
                  transition: 'all 0.25s',
                }}
              >
                {link.label}
              </a>
            );
          })}

          <Link
            to="/admin"
            className="btn btn-outline"
            style={{
              padding: '0.45rem 1.1rem',
              fontSize: '0.75rem',
              borderRadius: '30px',
              border: '1px solid #c9a84c',
              color: '#f0c040',
            }}
          >
            ⚙️ Admin
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
            background: 'none',
            border: 'none',
          }}
          className="mobile-toggle"
        >
          <span style={{ width: '25px', height: '2px', background: '#f0c040', display: 'block' }}></span>
          <span style={{ width: '25px', height: '2px', background: '#f0c040', display: 'block' }}></span>
          <span style={{ width: '25px', height: '2px', background: '#f0c040', display: 'block' }}></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#111111',
            borderTop: '1px solid rgba(201, 168, 76, 0.3)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '0.9rem',
                color: 'white',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: '#f0c040',
              fontWeight: 600,
              padding: '0.5rem 0',
            }}
          >
            ⚙️ Admin Panel
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

