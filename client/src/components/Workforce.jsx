import React from 'react';

export default function Workforce() {
  return (
    <section
      id="workforce"
      style={{
        position: 'relative',
        padding: '120px 0',
        backgroundImage: 'url(https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.88) 60%, rgba(10,10,10,0.5) 100%)',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '680px' }} className="reveal slide-left">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(240, 192, 64, 0.15)',
              border: '1px solid var(--gold-mid)',
              color: 'var(--gold-bright)',
              padding: '0.4rem 1.1rem',
              borderRadius: '50px',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '1.5rem',
            }}
          >
            🇹🇿 Tanzania First Principle
          </span>

          <h2 className="section-title">
            Empowering Our <span className="gold">National Workforce</span>
          </h2>
          <div className="gold-line" />

          <p style={{ color: 'var(--white-80)', fontSize: '1.08rem', lineHeight: '1.85', marginBottom: '1.5rem' }}>
            In alignment with Tanzania’s Local Content regulations, we prioritize the recruitment of talented Tanzanians. Since 2021, we have remained committed to the "Tanzania First" principle.
          </p>
          <p style={{ color: 'var(--white-80)', fontSize: '1.08rem', lineHeight: '1.85', marginBottom: '2.5rem' }}>
            We actively recruit from Chunya and Mbeya, providing stable employment and facilitating the transfer of technical expertise to ensure a sustainable future for the Tanzanian mining industry.
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ borderLeft: '3px solid var(--gold-bright)', paddingLeft: '1rem' }}>
              <div style={{ fontFamily: 'var(--ff-head)', fontSize: '1.8rem', color: 'var(--gold-bright)', fontWeight: 800 }}>
                Local Focus
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--white-60)' }}>
                Chunya & Mbeya First
              </div>
            </div>
            <div style={{ borderLeft: '3px solid var(--gold-bright)', paddingLeft: '1rem' }}>
              <div style={{ fontFamily: 'var(--ff-head)', fontSize: '1.8rem', color: 'var(--gold-bright)', fontWeight: 800 }}>
                Skills Transfer
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--white-60)' }}>
                Continuous Engineering & Lab Training
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

