import React from 'react';

export default function CSR() {
  const initiatives = [
    {
      img: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&auto=format&fit=crop',
      tag: 'Education',
      title: 'Schools & Classrooms',
      desc: 'Construction and renovation of local schools, delivering desks, textbooks, and sustainable learning environments.',
    },
    {
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
      tag: 'Healthcare',
      title: 'Community Health & Water',
      desc: 'Improving community access to primary health clinics, medical outreaches, and clean borehole drinking water.',
    },
    {
      img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop',
      tag: 'Empowerment',
      title: 'Local Growth & Supply Chain',
      desc: 'Prioritizing local business supply chains, vocational training, and economic empowerment across Mbeya region.',
    },
  ];

  return (
    <section id="csr" style={{ padding: '110px 0', background: 'var(--black-deep)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-badge">Giving Back</span>
          <h2 className="section-title">
            Corporate Social <span className="gold">Responsibility</span>
          </h2>
          <div className="gold-line" style={{ margin: '0 auto 1.5rem' }} />
          <p style={{ color: 'var(--white-80)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            We believe mining is a partnership. Our CSR initiatives are designed to create lasting benefits for our host communities in the Mbeya region.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {initiatives.map((item, idx) => (
            <div
              key={idx}
              className="reveal"
              style={{
                background: 'var(--black-card)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                border: '1px solid rgba(201, 168, 76, 0.25)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    color: 'var(--gold-bright)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                    marginBottom: '0.6rem',
                  }}
                >
                  {item.tag}
                </span>
                <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.35rem', marginBottom: '0.8rem', color: '#fff' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--white-80)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

