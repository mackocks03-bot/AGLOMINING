import React from 'react';

export default function Environment() {
  return (
    <section
      id="environment"
      style={{
        position: 'relative',
        padding: '120px 0',
        backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 10, 10, 0.88)',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '850px' }}>
        <span className="section-badge">Ecological Responsibility</span>
        <h2 className="section-title">
          Environmental <span className="gold">Stewardship</span>
        </h2>
        <div className="gold-line" style={{ margin: '0 auto 1.5rem' }} />

        <p style={{ color: 'var(--white-80)', fontSize: '1.1rem', lineHeight: '1.85', marginBottom: '3rem' }}>
          AFRIGOLD AND MINING INV. CO. LIMITED is committed to addressing environmental impacts and protecting the local ecosystem of Chunya, including diverse species of animals and plants. We have implemented international standards regarding the handling of hazardous materials. We ensure improved energy efficiency and increased productivity to minimize our ecological footprint. We utilize advanced filtration systems for treating and handling tailing materials before they are managed at designated sites.
        </p>

        {/* 3 Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {[
            { icon: '🌿', title: 'Ecosystem Protection', desc: 'Preserving natural flora & fauna of Chunya' },
            { icon: '⚡', title: 'Energy Efficiency', desc: 'Modern equipment with optimized fuel consumption' },
            { icon: '💧', title: 'Tailing Filtration', desc: 'Advanced closed-loop neutralization & management' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="reveal"
              style={{
                background: 'rgba(26, 26, 26, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(201, 168, 76, 0.35)',
                borderRadius: 'var(--radius)',
                padding: '2rem 1.5rem',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{item.icon}</div>
              <h4 style={{ fontFamily: 'var(--ff-head)', color: 'var(--gold-bright)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                {item.title}
              </h4>
              <p style={{ color: 'var(--white-80)', fontSize: '0.88rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

