import React from 'react';

export default function Hero({ content }) {
  const bgImage = content?.bgImageUrl || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&auto=format&fit=crop';
  const title = content?.title || 'AFRIGOLD AND MINING INV. CO. LIMITED';
  const subtitle = content?.subtitle || 'Transforming Natural Resources Into Sustainable Human Development';

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '620px',
        maxHeight: '1080px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '75px 1.5rem 85px',
      }}
    >
      {/* Background with Ken Burns animation */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'kenBurns 24s ease-in-out infinite alternate',
          transformOrigin: 'center center',
          zIndex: 1,
        }}
      />

      {/* Dark overlay with luxury gold tint */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(10, 10, 10, 0.65) 0%, rgba(10, 10, 10, 0.92) 80%, rgba(10, 10, 10, 1) 100%)',
          zIndex: 2,
        }}
      />

      {/* Hero Center Content — Sized to guarantee zero collision with bottom arrow */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          maxWidth: '880px',
          margin: '0 auto',
        }}
      >
        <span
          className="section-badge"
          style={{
            letterSpacing: '0.22em',
            boxShadow: '0 0 25px rgba(240, 192, 64, 0.25)',
            marginBottom: '0.85rem',
          }}
        >
          Established 2021 • Chunya, Mbeya, Tanzania
        </span>

        <h1
          className="shimmer-text"
          style={{
            fontFamily: 'var(--ff-head)',
            fontSize: 'clamp(2.1rem, 4.3vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            margin: '0.7rem 0 1.1rem',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '720px',
            margin: '0 auto 2rem',
            lineHeight: 1.6,
            fontWeight: 300,
          }}
        >
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1.25rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a href="#about" className="btn btn-gold">
            Discover Our Story
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-outline">
            Connect With Us
          </a>
        </div>
      </div>

      {/* Floating Animated Scroll Down Arrow (No box, visible immediately on screen load) */}
      <a
        href="#history"
        className="hero-scroll-indicator"
        aria-label="Scroll down to explore"
      >
        <span>Explore</span>
        <div className="arrow-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </a>
    </section>
  );
}
