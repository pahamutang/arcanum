import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';

const PROJECTS = [
  {
    id: 'lyrielle-veydris',
    name: 'LYRIELLE VEYDRIS',
    description: 'The Lyrielle Veydris project.',
    cover: '/projects/covers/lyrielle-veydris-cover.png',
    items: [
      { title: 'Lyrielle Veydris — 1', img: '/projects/LYRIELLE VEYDRIS/FIRST.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 2', img: '/projects/LYRIELLE VEYDRIS/SECOND.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 3', img: '/projects/LYRIELLE VEYDRIS/THIRD.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 4', img: '/projects/LYRIELLE VEYDRIS/FOURTH.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 5', img: '/projects/LYRIELLE VEYDRIS/FIFTH.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 6', img: '/projects/LYRIELLE VEYDRIS/SIXTH.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 7', img: '/projects/LYRIELLE VEYDRIS/SEVENTH.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 8', img: '/projects/LYRIELLE VEYDRIS/EIGTH.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 9', img: '/projects/LYRIELLE VEYDRIS/NINTH.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 10', img: '/projects/LYRIELLE VEYDRIS/TENTH.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 11', img: '/projects/LYRIELLE VEYDRIS/ELEVENTH.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 12', img: '/projects/LYRIELLE VEYDRIS/TWELVETH.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
      { title: 'Lyrielle Veydris — 13', img: '/projects/LYRIELLE VEYDRIS/TRESE.jpg', blurb: 'A view from the Lyrielle Veydris project.' },
    ],
  },
  {
    id: 'aelira-project',
    name: 'AELIRA PROJECT',
    description: 'The Aelira project.',
    cover: '/projects/covers/aelira-project-cover.png',
    items: [
      { title: 'Aelira — Living Area', img: '/projects/AELIRA PROJECT/LIVING AREA.jpg', blurb: 'The living area of the Aelira project.' },
      { title: 'Aelira — Living Area 2', img: '/projects/AELIRA PROJECT/LIVING AREA 2.jpg', blurb: 'A second view of the living area.' },
      { title: 'Aelira — Living Area (Night)', img: '/projects/AELIRA PROJECT/LIVING AREA NIGHT.jpg', blurb: 'The living area under evening lighting.' },
      { title: 'Aelira — Dining Area', img: '/projects/AELIRA PROJECT/DINING AREA.jpg', blurb: 'The dining area of the Aelira project.' },
      { title: 'Aelira — Dining Area (Night)', img: '/projects/AELIRA PROJECT/DINING AREA NIGHT.jpg', blurb: 'The dining area under evening lighting.' },
      { title: 'Aelira — Kitchen', img: '/projects/AELIRA PROJECT/KITCHEN.jpg', blurb: 'The kitchen of the Aelira project.' },
      { title: "Aelira — Master's Bedroom", img: "/projects/AELIRA PROJECT/MASTERS BEDROOM.jpg", blurb: "The primary bedroom of the Aelira project." },
      { title: "Aelira — Master's Bedroom (Night)", img: "/projects/AELIRA PROJECT/MASTERS BEDROOM NIGHT.jpg", blurb: "The primary bedroom under evening lighting." },
      { title: "Aelira — Master's Bedroom 2", img: '/projects/AELIRA PROJECT/masters bedroom 2.jpg', blurb: "A second view of the primary bedroom." },
      { title: 'Aelira — Bedroom 1', img: '/projects/AELIRA PROJECT/bedroom 1.jpg', blurb: 'A secondary bedroom in the Aelira project.' },
      { title: 'Aelira — Bedroom 2', img: '/projects/AELIRA PROJECT/BEDROOM 2.jpg', blurb: 'Another secondary bedroom in the Aelira project.' },
      { title: 'Aelira — Bedroom 2 (Night)', img: '/projects/AELIRA PROJECT/BEDROOM 2 NIGHT.jpg', blurb: 'The second bedroom under evening lighting.' },
      { title: 'Aelira — Bedroom (Night)', img: '/projects/AELIRA PROJECT/BEDROOM NIGHT.jpg', blurb: 'A bedroom under evening lighting.' },
      { title: 'Aelira — Floor Plan', img: '/projects/AELIRA PROJECT/FLOOR PLAN.jpg', blurb: 'The floor plan for the Aelira project.' },
      { title: 'Aelira — End of Journey', img: '/projects/AELIRA PROJECT/END OF JOURNEY.jpg', blurb: 'A closing view of the Aelira project.' },
      { title: 'Aelira — Feature 1', img: '/projects/AELIRA PROJECT/TO POST TO FB 1.jpg', blurb: 'A featured view of the Aelira project.' },
      { title: 'Aelira — Feature 2', img: '/projects/AELIRA PROJECT/TO POST TO FB 2.jpg', blurb: 'A featured view of the Aelira project.' },
    ],
  },
];

function FolderIcon({ open }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      {open ? (
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1H5a2 2 0 0 0-1.94 1.5L2 17V7Z M3.5 11h17l-2 8.5H5.5L3.5 11Z" />
      ) : (
        <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.379a1.5 1.5 0 0 1 1.06.44L11.06 6.56A1.5 1.5 0 0 0 12.12 7H19.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z" />
      )}
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function ImageGrid({ items, folderLabel, onSelect }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px', marginTop: '18px' }}>
      {items.map((item, index) => (
        <div
          key={item.title}
          onClick={() => item.pdf ? window.open(item.pdf, '_blank', 'noopener') : onSelect({ folderName: folderLabel, items, index })}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden', border: '1px solid rgba(181,128,74,0.15)', position: 'relative' }}>
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.78) saturate(0.8)', transition: 'transform 0.4s, filter 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'brightness(0.92) saturate(0.95)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.78) saturate(0.8)'; }}
            />
            {item.pdf && (
              <span style={{
                position: 'absolute', top: '6px', right: '6px',
                background: 'rgba(13,8,5,0.85)', border: '1px solid rgba(181,128,74,0.4)',
                color: 'var(--steel-light)', fontSize: '0.55rem', letterSpacing: '0.08em',
                padding: '3px 6px',
              }}>PDF</span>
            )}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--white-dim)', lineHeight: 1.4, marginTop: '8px' }}>{item.title}</div>
        </div>
      ))}
    </div>
  );
}

function ProjectFolderRow({ project, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ paddingLeft: '18px', borderLeft: '1px solid rgba(181,128,74,0.18)' }}>
      <button
        onClick={() => onSelect({ folderName: project.name, items: project.items, index: 0 })}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          color: 'var(--white)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{
            width: '52px', height: '52px', flexShrink: 0, overflow: 'hidden',
            border: '1px solid rgba(181,128,74,0.35)',
            boxShadow: hovered ? '0 0 0 2px rgba(181,128,74,0.5), 0 6px 16px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.35)',
            transition: 'box-shadow 0.25s ease, transform 0.25s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}>
            <img
              src={project.cover}
              alt={project.name}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(1.05)' }}
            />
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
            <span style={{ fontSize: '0.85rem', letterSpacing: '0.05em', fontWeight: 400 }}>{project.name}</span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--steel-light)' }}>{project.items.length} PHOTOS</span>
          </span>
        </span>
        <span style={{
          color: 'var(--steel-light)', transition: 'transform 0.25s ease',
          transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        }}><ArrowIcon direction="right" /></span>
      </button>
    </div>
  );
}

function ArrowIcon({ direction }) {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
      style={{ transform: direction === 'left' ? 'scaleX(1)' : 'scaleX(-1)' }}>
      <path d="M10 2.5L4.5 8l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function CompressIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3v3a2 2 0 0 1-2 2H4M15 3v3a2 2 0 0 0 2 2h3M9 21v-3a2 2 0 0 0-2-2H4M15 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function DesignDetailModal({ data, onNavigate, onClose }) {
  const { items, index, folderName } = data;
  const item = items[index];
  const hasMultiple = items.length > 1;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const cardRef = useRef(null);

  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobileView(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const activeSrc = (isMobileView && item.mobileImg) ? item.mobileImg : item.img;

  const goPrev = (e) => { e.stopPropagation(); onNavigate((prev) => ({ ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length })); };
  const goNext = (e) => { e.stopPropagation(); onNavigate((prev) => ({ ...prev, index: (prev.index + 1) % prev.items.length })); };

  const toggleFullscreen = async (e) => {
    e.stopPropagation();
    if (!isFullscreen) {
      try { await cardRef.current?.requestFullscreen?.(); } catch (err) { /* unsupported — CSS fallback still applies */ }
      setIsFullscreen(true);
    } else {
      try { if (document.fullscreenElement) await document.exitFullscreen(); } catch (err) { /* ignore */ }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) onClose();
      if (!hasMultiple) return;
      if (e.key === 'ArrowLeft') onNavigate((prev) => ({ ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length }));
      if (e.key === 'ArrowRight') onNavigate((prev) => ({ ...prev, index: (prev.index + 1) % prev.items.length }));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [hasMultiple, onNavigate, onClose]);

  return createPortal(
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(8,5,3,0.86)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isFullscreen ? 0 : 'clamp(10px, 4vw, 24px)',
      }}
    >
      <style>{`
        .arc-lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 54px; height: 54px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: 1px solid rgba(181,128,74,0.35);
          background: linear-gradient(155deg, rgba(35,25,16,0.85), rgba(10,6,4,0.7));
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          color: rgba(224,205,181,0.85);
          box-shadow: 0 6px 20px rgba(0,0,0,0.45);
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
          z-index: 6;
        }
        .arc-lb-nav:hover {
          border-color: rgba(214,168,118,0.95);
          background: linear-gradient(155deg, rgba(181,128,74,0.3), rgba(20,14,9,0.85));
          box-shadow: 0 8px 30px rgba(181,128,74,0.4), 0 0 0 1px rgba(214,168,118,0.35);
          transform: translateY(-50%) scale(1.1);
          color: #f5e6cf;
        }
        .arc-lb-nav.left { left: 22px; }
        .arc-lb-nav.right { right: 22px; }
        .arc-lb-nav svg { transition: transform 0.3s ease; }
        .arc-lb-nav.left:hover svg { transform: translateX(-3px); }
        .arc-lb-nav.right:hover svg { transform: translateX(3px); }
        .arc-lb-icon {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(214,168,118,0.45);
          background: rgba(8,5,3,0.88);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          color: rgba(240,225,204,0.95);
          box-shadow: 0 4px 16px rgba(0,0,0,0.55);
          cursor: pointer; font-size: 0.72rem;
          transition: all 0.25s ease;
        }
        .arc-lb-icon:hover {
          border-color: rgba(214,168,118,0.95);
          background: rgba(181,128,74,0.4);
          color: #fff5e6;
          box-shadow: 0 4px 20px rgba(181,128,74,0.45);
          transform: scale(1.08);
        }
        @media (max-width: 640px) {
          .arc-lb-nav { width: 42px; height: 42px; }
          .arc-lb-nav.left { left: 10px; }
          .arc-lb-nav.right { right: 10px; }
          .arc-lb-icon { width: 36px; height: 36px; }
        }
      `}</style>

      <motion.div
        ref={cardRef}
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          width: isFullscreen ? '100vw' : (isMobileView ? 'min(92vw, calc(86vh * 0.4626))' : 'min(96vw, 1180px)'),
          height: isFullscreen ? '100vh' : (isMobileView ? 'min(86vh, calc(92vw / 0.4626))' : 'min(70vw, 86vh, 820px)'),
          borderRadius: isFullscreen ? 0 : '2px',
          border: isFullscreen ? 'none' : '1px solid rgba(181,128,74,0.22)',
          background: '#0b0705',
          boxShadow: isFullscreen ? 'none' : '0 40px 90px rgba(0,0,0,0.85)',
          overflow: 'hidden',
          transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), height 0.4s cubic-bezier(0.22,1,0.36,1), border-radius 0.3s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={activeSrc}
            src={activeSrc}
            alt={item.title}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </AnimatePresence>

        <div style={{
          position: 'absolute', top: 0, right: 0, width: '170px', height: '120px',
          background: 'radial-gradient(circle at top right, rgba(8,5,3,0.65), transparent 70%)',
          pointerEvents: 'none', zIndex: 5,
        }} />

        <div style={{ position: 'absolute', top: '18px', right: '18px', display: 'flex', gap: '10px', zIndex: 6 }}>
          <button className="arc-lb-icon" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit full screen' : 'View full screen'}>
            {isFullscreen ? <CompressIcon /> : <ExpandIcon />}
          </button>
          <button className="arc-lb-icon" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {hasMultiple && (
          <>
            <button className="arc-lb-nav left" onClick={goPrev} aria-label="Previous image"><ArrowIcon direction="left" /></button>
            <button className="arc-lb-nav right" onClick={goNext} aria-label="Next image"><ArrowIcon direction="right" /></button>
          </>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
}

function Project() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="project">
      <Reveal as="p" className="section-label">Active Works</Reveal>
      <Reveal as="h2" className="section-title" delay={0.1}>Current <em>PROJECT</em></Reveal>

      <div style={{ marginTop: '60px' }}>
        <Reveal
          as="div"
          style={{
            border: '1px solid rgba(181,128,74,0.25)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            background: 'rgba(13,8,5,0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: 'clamp(24px, 3vw, 32px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--white)' }}>
            <span style={{ color: 'var(--steel-light)' }}><FolderIcon open /></span>
            <span style={{ fontSize: '0.95rem', letterSpacing: '0.05em', fontWeight: 400 }}>Projects</span>
          </div>

          <div
            style={{
              marginTop: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '20px 28px',
              alignItems: 'start',
            }}
          >
            {PROJECTS.map((project) => (
              <ProjectFolderRow
                key={project.id}
                project={project}
                onSelect={setSelected}
              />
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && <DesignDetailModal key="design-detail" data={selected} onNavigate={setSelected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

export default Project;
