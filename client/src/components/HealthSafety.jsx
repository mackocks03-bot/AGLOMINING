import React from 'react';

export default function HealthSafety() {
  return (
    <section id="health-safety" style={{ padding: '110px 0', background: 'var(--black-mid)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-badge">Life & Wellbeing</span>
          <h2 className="section-title">
            Health & <span className="gold">Safety First</span>
          </h2>
          <div className="gold-line" style={{ margin: '0 auto 1.5rem' }} />
          <p style={{ color: 'var(--white-80)', fontSize: '1.05rem' }}>
            We believe that zero harm is achievable through disciplined practices, continuous training, and genuine care.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {/* Health Card */}
          <div
            className="reveal slide-left"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              minHeight: '440px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.3) 100%)',
                zIndex: 2,
              }}
            />
            <div style={{ position: 'relative', zIndex: 3 }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(37, 211, 102, 0.2)',
                  border: '1px solid #25d366',
                  color: '#25d366',
                  padding: '0.25rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Comprehensive Health
              </span>
              <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>
                Workforce Health & Wellness
              </h3>
              <p style={{ color: 'var(--white-80)', lineHeight: '1.7', fontSize: '0.98rem' }}>
                At AFRIGOLD, we prioritize the physical and mental well-being of our workforce. We believe a healthy team is the foundation of a productive mine. We provide on-site medical services, conduct regular health screenings, and implement robust programs to combat local health challenges, ensuring high standards of sanitation and workplace hygiene across all sites in Chunya.
              </p>
            </div>
          </div>

          {/* Safety Card */}
          <div
            className="reveal slide-right"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              minHeight: '440px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.3) 100%)',
                zIndex: 2,
              }}
            />
            <div style={{ position: 'relative', zIndex: 3 }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(240, 192, 64, 0.2)',
                  border: '1px solid var(--gold-bright)',
                  color: 'var(--gold-bright)',
                  padding: '0.25rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                OSHA 2003 Compliant
              </span>
              <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>
                Zero Harm Safety Culture
              </h3>
              <p style={{ color: 'var(--white-80)', lineHeight: '1.7', fontSize: '0.98rem' }}>
                Safety is our license to operate. Our top-notch health and safety policies make our operations a safer place to work. We strive to maintain a secure mining industry by embedding a culture of safety and individual accountability at every level. Our business principles are based on targeting "Zero Harm." Our operations strictly adhere to the Occupational Safety and Health Act (OSHA 2003) of Tanzania.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

