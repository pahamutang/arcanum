import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';

/* Minimal line-icon set, one per role family. Falls back to a generic
   user glyph for anything unmatched. All use currentColor so they pick
   up the gold accent already applied via .org-avatar-fallback. */
function RoleIcon({ role = '' }) {
  const r = role.toLowerCase();
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

  if (r.includes('ai')) return ( // AI Architect
    <svg {...common}><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></svg>
  );
  if (r.includes('developer')) return (
    <svg {...common}><polyline points="8 6 2 12 8 18" /><polyline points="16 6 22 12 16 18" /></svg>
  );
  if (r.includes('architect')) return (
    <svg {...common}><circle cx="12" cy="12" r="9" /><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5" /></svg>
  );
  if (r.includes('design') || r.includes('editor')) return (
    <svg {...common}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
  );
  if (r.includes('structural')) return (
    <svg {...common}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
  );
  if (r.includes('estimator')) return (
    <svg {...common}><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="12" x2="8" y2="12" /><line x1="12" y1="12" x2="12" y2="12" /><line x1="16" y1="12" x2="16" y2="12" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="12" y1="16" x2="12" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></svg>
  );
  if (r.includes('electrical')) return (
    <svg {...common}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  );
  if (r.includes('plumb')) return (
    <svg {...common}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" /></svg>
  );
  if (r.includes('coordinator')) return (
    <svg {...common}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
  );
  return ( // generic fallback
    <svg {...common}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  );
}

function OrgAvatar({ src, role, alt, size = '', onClick }) {
  const [failed, setFailed] = useState(false);
  const cls = size === 'sm' ? 'org-avatar-sm' : 'org-avatar';
  const fallbackCls = size === 'sm' ? 'org-avatar-fallback org-avatar-fallback-sm' : 'org-avatar-fallback';
  if (!src || failed) {
    return <div className={fallbackCls}><RoleIcon role={role} /></div>;
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      onClick={onClick ? (e) => { e.stopPropagation(); onClick(); } : undefined}
      className={`${cls}${onClick ? ' org-avatar-clickable' : ''}`}
    />
  );

}

/* ── PHOTO LIGHTBOX ── enlarges a team member's photo on click, mirroring the portfolio detail modal */
function PhotoLightbox({ photo, onClose }) {
  return createPortal(
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(13,8,5,0.82)', backdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: '440px',
          maxHeight: 'calc(100vh - 48px)',
          border: '1px solid rgba(181,128,74,0.18)',
          background: 'rgba(28,20,13,0.98)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.85)',
          position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: '14px', right: '14px', zIndex: 10,
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'rgba(13,8,5,0.75)', border: '1px solid rgba(181,128,74,0.5)',
            color: 'var(--steel-light)', fontSize: '0.8rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)', boxShadow: '0 4px 16px rgba(0,0,0,0.55)',
          }}
        >✕</button>
        <div style={{ width: '100%', maxHeight: '65vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', background: 'rgba(0,0,0,0.25)' }}>
          <img
            src={photo.src}
            alt={photo.name}
            style={{ width: '100%', height: 'auto', maxHeight: '65vh', objectFit: 'contain', display: 'block' }}
          />
        </div>
        <div style={{ padding: '22px 26px 26px', textAlign: 'center' }}>
          <div style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--white)', letterSpacing: '0.04em', marginBottom: '6px' }}>{photo.name}</div>
          <div style={{ fontSize: '0.62rem', letterSpacing: '0.28em', color: 'var(--steel-light)', textTransform: 'uppercase' }}>{photo.role}</div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function AboutUs() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const orgBranches = [
    {
      key: 'dev',
      primary: { role: 'Developer', name: 'Daven Niel Pahamutang', photo: '/team/daven.jpg', init: 'DP' },
      rows: [
        {
          items: [
            { role: 'Junior Developer', name: 'Miguel Torres' },
            { role: 'Junior Developer', name: 'Bea Santos' },
            { role: 'Junior Developer', name: 'Carlo Reyes' },
          ],
        },
      ],
    },
    {
      key: 'arch',
      center: true,
      primary: { role: 'Head Architect', name: 'Charles B. Caderao', photo: '/team/charles.jpg', init: 'CC' },
      rows: [
        {
          items: [
            { role: 'Architect', name: 'Antonio Fernandez' },
            { role: 'Project Coordinator', name: 'Carl Jastine Garcia', photo: '/team/carl.jpg', init: 'CG' },
            { role: 'Architect', name: 'Rafael Delos Santos' },
          ],
        },
        {
          items: [
            { role: 'Design Editor', name: 'Nicole Bautista' },
            { role: 'Design Editor', name: 'Marco Villanueva' },
            { role: 'Design Editor', name: 'Diana Salazar' },
          ],
        },
        {
          items: [
            { role: 'AI Architect', name: 'Ethan Domingo' },
            { role: 'AI Architect', name: 'Sophia Ramos' },
            { role: 'AI Architect', name: 'Julian Aquino' },
          ],
        },
      ],
    },
    {
      key: 'eng',
      primary: { role: 'Engineer', name: 'John', photo: '/team/john.jpg', init: 'J' },
      rows: [
        {
          items: [
            { role: 'Structural', name: 'Gabriel Mendoza' },
            { role: 'Estimator', name: 'Patricia Uy' },
          ],
        },
        {
          items: [
            { role: 'Electrical', name: 'Kevin Lim' },
            { role: 'Master Plumber', name: 'Ramon Garcia' },
          ],
        },
      ],
    },
  ];

  return (
    <section id="aboutus">
      <Reveal as="p" className="section-label">Who We Are</Reveal>
      <Reveal as="h2" className="section-title" delay={0.1}>The <em>Arcanum</em> Story</Reveal>

      <div className="ab-story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginTop: '60px', marginBottom: '100px' }}>
        <Reveal as="div" delay={0.1}>
          <p style={{ color: 'var(--white-dim)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '20px' }}>
            Arcanum Design & Construct was established in Cebu City with one belief: that great architecture is not a luxury — it is a necessity for how people live, work, and connect with the world around them.
          </p>
          <p style={{ color: 'var(--white-dim)', fontSize: '0.95rem', lineHeight: 1.9 }}>
            We are a full-service architectural practice with deep roots in Southeast Asian design culture and a global perspective shaped by collaborations across Japan, Singapore, and Europe.
          </p>
        </Reveal>
        <Reveal as="div" delay={0.2} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {[['5','Active Projects'],['28yr','In Practice'],['97%','Client Satisfaction'],['14','Design Awards']].map(([n, l]) => (
            <div key={l} style={{ padding: '28px', border: '1px solid rgba(181,128,74,0.15)' }}>
              <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: 'var(--steel-light)', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--silver)', marginTop: '8px', textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="vmg-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
        <Reveal
          as="div"
          delay={0.1}
          className="vmg-box"
          style={{
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            padding: 'clamp(24px, 3vw, 36px)',
            background: 'rgba(13,8,5,0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <span className="vmg-label">Vision</span>
          <p style={{ color: 'var(--white-dim)', fontSize: '0.9rem', lineHeight: 1.85, marginTop: '8px' }}>
            To be the leading architectural practice in the Philippines, recognized for design that honors culture, embraces innovation, and shapes sustainable urban futures.
          </p>
        </Reveal>

        <Reveal
          as="div"
          delay={0.18}
          className="vmg-box"
          style={{
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            padding: 'clamp(24px, 3vw, 36px)',
            background: 'rgba(13,8,5,0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <span className="vmg-label">Mission</span>
          <p style={{ color: 'var(--white-dim)', fontSize: '0.9rem', lineHeight: 1.85, marginTop: '8px' }}>
            We craft spaces that inspire, endure, and elevate everyday life, through collaborative design, technical precision, and an unwavering commitment to every client's vision.
          </p>
        </Reveal>

        <Reveal
          as="div"
          delay={0.26}
          className="vmg-box"
          style={{
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            padding: 'clamp(24px, 3vw, 36px)',
            background: 'rgba(13,8,5,0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <span className="vmg-label">Goals</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
            {[
              'Deliver design excellence on every project, regardless of scale.',
              'Expand sustainable, climate-responsive building practices across the Visayas and Mindanao.',
              'Cultivate the next generation of Filipino architects and designers.',
              'Strengthen international collaboration and cross-cultural design exchange.',
            ].map((g) => (
              <div key={g} style={{ display: 'flex', gap: '10px', fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--white-dim)' }}>
                <span style={{ color: 'var(--steel-light)', flexShrink: 0 }}>&mdash;</span>
                <span>{g}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="vmg-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '100px' }}>
        <Reveal
          as="div"
          delay={0.34}
          className="vmg-box"
          style={{
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            padding: 'clamp(28px, 4vw, 44px)',
            background: 'rgba(13,8,5,0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <span className="vmg-label">Core Values</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '24px', marginTop: '8px' }}>
            {[
              ['Integrity', 'We build trust through honesty, transparency, and accountability in every relationship.'],
              ['Craftsmanship', 'We obsess over detail, treating precision as a form of respect for the people we build for.'],
              ['Innovation', 'We blend tradition with technology, always searching for a better way to design and build.'],
              ['Collaboration', 'We believe architecture is a shared craft, built on trust between client, architect, and builder.'],
            ].map(([t, d]) => (
              <div key={t}>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--steel-light)', marginBottom: '8px' }}>{t}</div>
                <div style={{ fontSize: '0.82rem', lineHeight: 1.65, color: 'var(--silver)' }}>{d}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          as="div"
          delay={0.42}
          className="vmg-box"
          style={{
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            padding: 'clamp(28px, 4vw, 44px)',
            background: 'rgba(13,8,5,0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <span className="vmg-label">Supporting Values</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
            {['Accountability', 'Respect', 'Continuous Learning', 'Community Stewardship', 'Sustainability'].map((v) => (
              <span
                key={v}
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  color: 'var(--silver)',
                  border: '1px solid rgba(181,128,74,0.25)',
                  padding: '8px 18px',
                }}
              >
                {v}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal as="p" className="section-label">The Team</Reveal>
      <Reveal as="h3" className="section-title" delay={0.1} style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '56px' }}>Minds Behind the <em>Work</em></Reveal>

      <Reveal as="div" delay={0.15} className="orgchart">
        <div className="org-root-node">
          <div>
            <div className="org-root-title">ARCANUM DESIGN &amp; CONSTRUCT</div>
            <div className="org-root-sub">Studio &middot; Cebu City, Philippines</div>
          </div>
        </div>

        <div className="org-stem" />

        <div className="org-columns">
          {orgBranches.map((branch, ci) => (
            <div className={`org-column${branch.center ? ' org-column-center' : ''}`} key={branch.key}>
              <Reveal as="div" delay={0.2 + ci * 0.1} className="org-node-primary">
                <OrgAvatar
                  src={branch.primary.photo}
                  role={branch.primary.role}
                  alt={branch.primary.name}
                  onClick={branch.primary.photo ? () => setSelectedPhoto({ src: branch.primary.photo, name: branch.primary.name, role: branch.primary.role }) : undefined}
                />
                {branch.primary.name ? (
                  <>
                    <div className="org-name">{branch.primary.name}</div>
                    <div className="org-role">{branch.primary.role}</div>
                  </>
                ) : (
                  <div className="org-name">{branch.primary.role}</div>
                )}
              </Reveal>

              {branch.rows.map((row, ri) => (
                <div className={`org-row${row.items.length > 1 ? ' multi' : ''}`} key={ri}>
                  {row.items.map((item, ii) => (
                    <Reveal as="div" delay={0.3 + ci * 0.1 + ri * 0.08 + ii * 0.04} className="org-node" key={ii}>
                      <OrgAvatar
                        src={item.photo}
                        role={item.role}
                        alt={item.name}
                        size="sm"
                        onClick={item.photo ? () => setSelectedPhoto({ src: item.photo, name: item.name, role: item.role }) : undefined}
                      />
                      <div className="org-node-name-sm">{item.name}</div>
                      <div className="org-node-role-sm">{item.role}</div>
                    </Reveal>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {selectedPhoto && <PhotoLightbox key="about-photo-lightbox" photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
      </AnimatePresence>
    </section>
  );
}

export default AboutUs;
