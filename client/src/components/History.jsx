import React from 'react';

export default function History({ content }) {
  const p1 = content?.paragraph1 || "Tanzania has a thriving mining industry, and gold mining is a potential driver of economic development. Sound national development plans, world-class infrastructure, investor-friendly policies, and regulatory frameworks attract significant foreign investments to Tanzania. The nation's abundant natural resources and biodiversity attracted the founders of AFRIGOLD AND MINING INV. CO. LIMITED.";
  const p2 = content?.paragraph2 || "In 2026, recognizing that Tanzania is a land of endless opportunities for mining and investment, the promoters took a major step forward by entering the rapidly growing mining sector. AFRIGOLD AND MINING INV. CO. LIMITED’s key project activity involves the extraction of high-quality gold bars and gold concentrates.";

  return (
    <section id="history" style={{ padding: '110px 0', background: 'var(--black-mid)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Text Content */}
          <div className="reveal">
            <span className="section-badge">Heritage & Evolution</span>
            <h2 className="section-title">
              Driving Tanzania's <span className="gold">Gold Wealth</span> & Future
            </h2>
            <div className="gold-line" />

            <p style={{ color: 'var(--white-80)', marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: '1.8' }}>
              {p1}
            </p>
            <p style={{ color: 'var(--white-80)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: '1.8' }}>
              {p2}
            </p>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--white-10)' }}>
              <div>
                <div style={{ fontFamily: 'var(--ff-head)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--gold-bright)' }}>
                  2021
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--white-60)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Established
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--ff-head)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--gold-bright)' }}>
                  Chunya
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--white-60)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Headquarters
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--ff-head)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--gold-bright)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--white-60)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Compliance
                </div>
              </div>
            </div>
          </div>

          {/* Right Image (SCARVETOR1.jpeg) */}
          <div className="reveal slide-right" style={{ position: 'relative' }}>
            {/* Background gold border decoration */}
            <div
              style={{
                position: 'absolute',
                inset: '-14px 14px 14px -14px',
                border: '2px solid rgba(201, 168, 76, 0.4)',
                borderRadius: 'var(--radius-lg)',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                height: '480px',
              }}
            >
              <img
                src="/SCARVETOR1.jpeg"
                alt="AFRIGOLD Excavator Mining Site"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

