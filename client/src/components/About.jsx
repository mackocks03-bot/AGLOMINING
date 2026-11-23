import React from 'react';

export default function About({ content, images = [] }) {
  const desc = content?.description || "AFRIGOLD AND MINING INV. CO. LIMITED is a pioneering gold mining leader headquartered in Chunya, Mbeya, United Republic of Tanzania. Established in 2021, the company is founded on sustainable business philosophies intended to transform natural resources into tools for national development. Our state-of-the-art facility in Chunya includes exploration, mines, a laboratory, a chemical plant, stores, a workshop, processing plants, sales, logistics, and construction. The company has emerged as a leading player in the global mining industry by expanding its presence in gold mining and trading.";
  const vision = content?.vision || "To be the most responsible and largest gold mining corporation in the world, focusing on sustainable human development.";
  const mission = content?.mission || "To deliver incredible synergy and enduring value to the national economy and to humanity.";

  // Dynamic images from Admin Image Manager
  const aboutImages = images.filter((img) => img.section === 'about' || img.section === 'operations');

  const defaultItems = [
    { src: '/SCARVETOR2.jpeg', label: 'Excavation & Extraction' },
    { src: '/SCARVETOR3.jpeg', label: 'Heavy Mine Machinery' },
    { src: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&auto=format&fit=crop', label: 'High Purity Gold Bars' },
    { src: 'https://images.unsplash.com/photo-1532094349884-543559338ec7?w=800&auto=format&fit=crop', label: 'Assay & Chemical Lab' },
  ];

  // Merge uploaded images with defaults
  const displayItems = aboutImages.length > 0
    ? [
        ...aboutImages.map((img) => ({
          src: img.url,
          label: img.altText || 'Mine Facilities & Operations',
        })),
        ...defaultItems,
      ].slice(0, 8)
    : defaultItems;

  return (
    <section id="about" style={{ padding: '110px 0', background: 'var(--black-deep)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-badge">Corporate Profile</span>
          <h2 className="section-title">
            About <span className="gold">AFRIGOLD & MINING</span>
          </h2>
          <div className="gold-line" style={{ margin: '0 auto 1.5rem' }} />
          <p style={{ color: 'var(--white-80)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            {desc}
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {/* Vision */}
          <div
            className="reveal slide-left"
            style={{
              background: 'linear-gradient(145deg, #181818 0%, #111111 100%)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              borderRadius: 'var(--radius)',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👁️</div>
            <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.6rem', color: 'var(--gold-bright)', marginBottom: '0.8rem' }}>
              Our Vision
            </h3>
            <p style={{ color: 'var(--white-80)', lineHeight: '1.7' }}>
              {vision}
            </p>
          </div>

          {/* Mission */}
          <div
            className="reveal slide-right"
            style={{
              background: 'linear-gradient(145deg, #181818 0%, #111111 100%)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              borderRadius: 'var(--radius)',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.6rem', color: 'var(--gold-bright)', marginBottom: '0.8rem' }}>
              Our Mission
            </h3>
            <p style={{ color: 'var(--white-80)', lineHeight: '1.7' }}>
              {mission}
            </p>
          </div>
        </div>

        {/* Facility & Operation Image Grid (Supports Dynamic Admin Uploads) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {displayItems.map((item, idx) => (
            <div
              key={idx}
              className="reveal"
              style={{
                position: 'relative',
                height: '260px',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                border: '1px solid rgba(201, 168, 76, 0.25)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={item.src}
                alt={item.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.25rem',
                  pointerEvents: 'none',
                }}
              >
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gold-bright)' }}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
