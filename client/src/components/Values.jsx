import React from 'react';

export default function Values() {
  const values = [
    {
      icon: '🛡️',
      title: 'Safety',
      desc: 'We target "Zero Harm" performance in every operation, ensuring every worker returns home safely.',
    },
    {
      icon: '💎',
      title: 'Transparency',
      desc: 'We uphold open, honest, and ethical communication with all stakeholders, partners, and regulators.',
    },
    {
      icon: '⚖️',
      title: 'Accountability',
      desc: 'We take complete ownership of our environmental, economic, and social impacts in every mining activity.',
    },
    {
      icon: '🤝',
      title: 'Respect',
      desc: 'We treat the land, the law, and the noble people of Tanzania with the highest dignity and reverence.',
    },
  ];

  return (
    <section id="values" style={{ padding: '110px 0', background: 'var(--black-deep)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <span className="section-badge">Ethical Framework</span>
          <h2 className="section-title">
            Our Core <span className="gold">Values</span>
          </h2>
          <div className="gold-line" style={{ margin: '0 auto 1.5rem' }} />
          <p style={{ color: 'var(--white-80)', fontSize: '1.05rem' }}>
            The unshakeable principles that govern every decision, extraction, and partnership at AFRIGOLD.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {values.map((v, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                background: 'linear-gradient(145deg, #161616 0%, #0d0d0d 100%)',
                border: '1px solid rgba(201, 168, 76, 0.25)',
                borderRadius: 'var(--radius)',
                padding: '2.5rem 2rem',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(240, 192, 64, 0.7)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(240, 192, 64, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.25)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.5rem', color: 'var(--gold-bright)', marginBottom: '0.8rem' }}>
                {v.title}
              </h3>
              <p style={{ color: 'var(--white-80)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

