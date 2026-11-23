import React from 'react';

export default function Careers({ content }) {
  const hrEmail = content?.hrEmail || 'hr@afrigold.co.tz';

  const departments = [
    'Mining Operations & Geology',
    'Assay & Chemical Laboratory',
    'Heavy Machinery Engineering',
    'Environmental & Safety Compliance',
    'Logistics, Supply Chain & Stores',
    'Finance & Corporate Administration',
  ];

  return (
    <section id="careers" style={{ padding: '110px 0', background: 'var(--black-mid)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          {/* Left Column */}
          <div className="reveal">
            <span className="section-badge">Opportunities</span>
            <h2 className="section-title">
              Build Your Future in <span className="gold">Mining</span>
            </h2>
            <div className="gold-line" />

            <p style={{ color: 'var(--white-80)', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              We offer more than just a job; we provide a platform for a rewarding, impactful career in one of Africa’s most dynamic mining operations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {departments.map((dep, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    color: 'var(--white)',
                    fontSize: '0.95rem',
                  }}
                >
                  <span style={{ color: 'var(--gold-bright)', fontSize: '1.1rem' }}>✓</span>
                  <span>{dep}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right CTA Card */}
          <div
            className="reveal slide-right"
            style={{
              background: 'linear-gradient(145deg, #181818 0%, #101010 100%)',
              border: '1.5px solid rgba(240, 192, 64, 0.4)',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2.5rem',
              boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
            <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.8rem', color: 'var(--gold-bright)', marginBottom: '1rem' }}>
              Join Our Team
            </h3>
            <p style={{ color: 'var(--white-80)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Interested in joining AFRIGOLD? Send your CV and cover letter directly to our Human Resources department.
            </p>

            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px dashed rgba(201, 168, 76, 0.5)',
                padding: '1rem',
                borderRadius: 'var(--radius)',
                marginBottom: '2rem',
                color: 'var(--gold-pale)',
                fontWeight: 600,
                fontSize: '1.1rem',
              }}
            >
              {hrEmail}
            </div>

            <a
              href={`mailto:${hrEmail}?subject=Job%20Application%20-%20AFRIGOLD`}
              className="btn btn-gold"
              style={{ width: '100%', padding: '1rem' }}
            >
              Send Application via Email →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

