import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

/* ── COMPONENTS ── */

function Navbar({ activeSection, onNavigate, onMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Project',  key: 'about'   },
    { label: 'Services', key: 'services' },
    { label: 'Portfolio',key: 'portfolio'},
    { label: 'Contact',  key: 'contact'  },
    { label: 'About Us', key: 'aboutus'  },
  ];

  const handleNav = (key) => {
    setDrawerOpen(false);
    onNavigate(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = false; // nav links always visible for direct section navigation

  return (
    <>
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); handleNav('home'); }}>ARCANUM</a>

      {!isHome && (
        <ul className="nav-links">
          {navItems.map(({ label, key }) => (
            <li key={key}>
              <a
                href="#"
                data-section={key}
                style={activeSection === key ? { color: 'var(--steel-light)' } : {}}
                onClick={e => { e.preventDefault(); handleNav(key); }}
              >{label}</a>
            </li>
          ))}
        </ul>
      )}

      <button
        className="nav-cta nav-cta-header"
        onClick={onMenu}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'var(--steel-light)', border: '1px solid rgba(181,128,74,0.4)',
          background: 'transparent', padding: '10px 20px', transition: 'background 0.3s, border-color 0.3s',
          alignItems: 'center', gap: '6px',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(181,128,74,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        ⚜ Menu
      </button>

      {!isHome && (
        <button className={`nav-toggle ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(!drawerOpen)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      )}
    </nav>

    {!isHome && createPortal(
      <AnimatePresence>
        {drawerOpen && (
          <div className="nav-drawer open">
            <motion.div
              className="nav-drawer-backdrop"
              onClick={() => setDrawerOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
            <motion.div
              className="nav-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="nav-drawer-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <span />
                <span />
              </button>

              <ul className="nav-links">
                {navItems.map(({ label, key }) => (
                  <li key={key}>
                    <a href="#" onClick={e => { e.preventDefault(); handleNav(key); }}>{label}</a>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => { setDrawerOpen(false); onMenu(); }}
                style={{
                  marginTop: '40px', fontFamily: "'Inter', sans-serif",
                  fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: 'var(--steel-light)', border: '1px solid rgba(181,128,74,0.4)',
                  background: 'transparent', padding: '14px 28px', alignSelf: 'flex-start',
                }}
              >
                ⚜ Back to Menu
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}

export default Navbar;
