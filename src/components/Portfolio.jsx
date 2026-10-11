import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';

const PORTFOLIO_ITEMS = [
  { title: 'Portfolio Page 1', img: '/projects/thesis/portfolio-page-1.jpg', cls: 'pt-1', delay: 0, blurb: 'A page from the academic thesis portfolio documenting design research, process, and methodology.' },
  { title: 'Portfolio Page 2', img: '/projects/thesis/portfolio-page-2.jpg', cls: 'pt-2', delay: 0.1, blurb: 'A page from the academic thesis portfolio documenting design research, process, and methodology.' },
  { title: 'Portfolio Page 3', img: '/projects/thesis/portfolio-page-3.jpg', cls: 'pt-3', delay: 0.2, blurb: 'A page from the academic thesis portfolio documenting design research, process, and methodology.' },
  { title: 'Portfolio Page 4', img: '/projects/thesis/portfolio-page-4.jpg', cls: 'pt-4', delay: 0.3, blurb: 'A page from the academic thesis portfolio documenting design research, process, and methodology.' },
  { title: 'Portfolio Page 5', img: '/projects/thesis/portfolio-page-5.jpg', cls: 'pt-5', delay: 0.4, blurb: 'A page from the academic thesis portfolio documenting design research, process, and methodology.' },
  { title: 'Portfolio Page 6', img: '/projects/thesis/portfolio-page-6.jpg', cls: 'pt-1', delay: 0.5, blurb: 'A page from the academic thesis portfolio documenting design research, process, and methodology.' },
];

function PortfolioDetailModal({ item, onClose }) {
  return createPortal(
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(13,8,5,0.78)', backdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: '620px',
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
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(13,8,5,0.75)', border: '1px solid rgba(181,128,74,0.5)',
            color: 'var(--steel-light)', fontSize: '0.85rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)', boxShadow: '0 4px 16px rgba(0,0,0,0.55)',
          }}
        >✕</button>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ width: '100%', position: 'relative' }}>
            <img src={item.img} alt={item.title} loading="lazy"
              style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{ padding: '24px 28px 30px' }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'var(--steel-light)', marginBottom: '10px' }}>THESIS PORTFOLIO</div>
            <h3 style={{ fontSize: 'clamp(1rem,2.2vw,1.35rem)', fontWeight: 300, color: 'var(--white)', marginBottom: '16px' }}>{item.title}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--white-dim)', lineHeight: 1.85 }}>{item.blurb}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function Portfolio() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="portfolio">
      <div className="portfolio-header">
        <div>
          <Reveal as="p" className="section-label">Selected Works</Reveal>
          <Reveal as="h2" className="section-title" delay={0.1}>Our <em>Portfolio</em></Reveal>
        </div>
      </div>
      <div className="portfolio-grid">
        {PORTFOLIO_ITEMS.map((item) => (
          <Reveal as="div" key={item.title} className="portfolio-item" delay={item.delay}
            onClick={() => setSelected(item)}>
            <div className={`portfolio-thumb ${item.cls}`}>
              <div className="portfolio-thumb-inner">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  onLoad={e => e.target.classList.add('loaded')}
                  style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', filter:'brightness(0.72) saturate(0.75)', transition:'filter 0.5s, transform 0.6s' }}
                />
                <div className="img-skeleton" />
              </div>
            </div>
            <div className="portfolio-overlay">
              <div className="portfolio-meta">THESIS PORTFOLIO</div>
              <div className="portfolio-name">{item.title}</div>
            </div>
            <div className="portfolio-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 14L14 2M14 2H6M14 2v8"/></svg>
            </div>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {selected && <PortfolioDetailModal key="portfolio-detail" item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

export default Portfolio;
