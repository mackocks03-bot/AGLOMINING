import React from 'react';

export default function Leadership({ content }) {
  const message = content?.message || "A hearty welcome to AFRIGOLD AND MINING INV. CO. LIMITED. We are transforming natural resources into sustainable human development and nation-building tools for humanity and the modern world.\n\nAs a responsible corporate entity operating in the United Republic of Tanzania, we are committed to synergistically adding value to the country’s mining industry and participating in sustainable economic development. Tanzania is keeping pace with the rest of the world by promoting investments and strengthening national institutions.\n\nWe value the environment and humanity. We are committed to improving the well-being of local communities in Chunya and creating enduring value for all stakeholders. Looking ahead, our business philosophy of nation-building will enhance our goodwill and transform our status into a premier global entity.";
  const mdName = content?.mdName || "Managing Director";
  const mdTitle = content?.mdTitle || "AFRIGOLD AND MINING INV. CO. LIMITED";

  return (
    <section id="leadership" style={{ padding: '110px 0', background: 'var(--black-mid)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Executive Portrait */}
          <div className="reveal slide-left" style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                inset: '-12px -12px 12px 12px',
                border: '2px solid rgba(240, 192, 64, 0.4)',
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
                height: '520px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop"
                alt="Managing Director"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Message Text */}
          <div className="reveal">
            <span className="section-badge">Leadership Keynote</span>
            <h2 className="section-title">
              Managing Director’s <span className="gold">Message</span>
            </h2>
            <div className="gold-line" />

            <div
              style={{
                fontSize: '4rem',
                fontFamily: 'var(--ff-head)',
                lineHeight: 0.8,
                color: 'var(--gold-mid)',
                opacity: 0.4,
                marginBottom: '1rem',
              }}
            >
              “
            </div>

            <div
              style={{
                borderLeft: '3px solid var(--gold-mid)',
                paddingLeft: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              {message.split('\n\n').map((para, i) => (
                <p key={i} style={{ color: 'var(--white-80)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                  {para}
                </p>
              ))}
            </div>

            <div>
              <div style={{ fontFamily: 'var(--ff-head)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--gold-bright)' }}>
                {mdName}
              </div>
              <div style={{ color: 'var(--white-60)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {mdTitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

