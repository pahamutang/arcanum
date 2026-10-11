import { useState, useEffect, useRef } from 'react';
import './SplashScreen.css';
import { MENU_ITEMS } from '../data/menuItems';
import audioMgr from '../utils/audio';
import WingSvg from './WingSvg';
import HudDialogue from './HudDialogue';

/* ═══════════════════════════════════════════
   SPLASH SCREEN — Anime Elf RPG Menu
   Shows first; clicking a menu item fades it
   out and scrolls to that section.
═══════════════════════════════════════════ */
function SplashScreen({ onDone }) {
  const [active, setActive] = useState(0);
  const [out, setOut] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [elfAction, setElfAction] = useState('IDLE');
  // eslint-disable-next-line no-unused-vars
  const [swaying, setSwaying]           = useState(false); // unused, kept for safety
  const [bodyPhase, setBodyPhase]       = useState('closed');
  const [itemsVisible, setItemsVisible] = useState(false);
  const [dustParticles, setDustParticles] = useState([]);
  const attackTimerRef = useRef(null);

  // Unrolls the real menu panel itself — no separate placeholder animation.
  // Same wooden-roller scroll that plays the "opening" beat is the one that becomes the menu.
  const handleScrollUnfurled = () => {
    setTimeout(() => setBodyPhase('opening'), 80);
    setTimeout(() => setBodyPhase('open'), 800);
    setTimeout(() => setItemsVisible(true), 1000);
    // Pearl dust particles
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${20 + Math.random() * 60}%`,
      top:  `${35 + Math.random() * 30}%`,
      dx:   `${(Math.random() - 0.5) * 48}px`,
      delay: `${i * 0.055}s`,
    }));
    setDustParticles(particles);
    setTimeout(() => setDustParticles([]), 1200);
  };

  // Brief hold (scroll appears "rolled tight") before it unrolls into the menu —
  // mirrors the old canvas hold beat, but now drives the real panel directly.
  useEffect(() => {
    const t = setTimeout(handleScrollUnfurled, 550);
    return () => clearTimeout(t);
  }, []);

  // When hovering a button: play ATTACK once, then return to IDLE
  const aimAt = () => {
    if (attackTimerRef.current) clearTimeout(attackTimerRef.current);
    setElfAction('ATTACK');
    // Switch back to IDLE just before the animation ends to avoid blank flash
    attackTimerRef.current = setTimeout(() => setElfAction('IDLE'), 820);
  };

  // Track raw mouse for idle animation


  const choose = (href, idx) => {
    setActive(idx);
    setOut(true);
    audioMgr.stopMenu();
    const sectionMap = {
      '#hero': 'home',
      '#about': 'about',
      '#services': 'services',
      '#portfolio': 'portfolio',
      '#cta': 'contact',
    };
    // disambiguate Project vs About Us by index
    const keyByIndex = ['home','about','services','portfolio','contact','aboutus'];
    setTimeout(() => {
      onDone(keyByIndex[idx] || sectionMap[href] || 'home');
    }, 880);
  };

  useEffect(() => {
    const fn = (e) => {
      if (e.key==='ArrowDown') setActive(i=>Math.min(i+1,MENU_ITEMS.length-1));
      if (e.key==='ArrowUp')   setActive(i=>Math.max(i-1,0));
      if (e.key==='Enter')     choose(MENU_ITEMS[active].href, active);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <>
      <div className={`sp-root${out?' sp-out':''}`}>

        {/* scene */}
        <div className="sp-scene" />
        <div className="sp-scene-white" />

        {/* title removed — frame.png carries its own logo/crest */}

        {/* elf + pillar — wrapped together in the ornate outer frame */}
        <div className="sp-frame-wrap">
          <img className="sp-frame-img sp-frame-img-desktop" src="/menu-frame-desktop.png" alt="" aria-hidden="true" />
          <img className="sp-frame-img sp-frame-img-mobile" src="/menu-frame-mobile.png" alt="" aria-hidden="true" />
          <div className="sp-stage">

          {/* ── Wings Menu ── */}
          <div className="sp-scroll-wrap" style={{ position: 'relative' }}>

            {/* Dust sparkles on open */}
            {dustParticles.map(p => (
              <div key={p.id} className="sp-dust" style={{
                left: p.left, top: p.top,
                '--dx': p.dx, animationDelay: p.delay,
              }} />
            ))}

            {/* ── LEFT WING ── */}
            <div className="sp-wing-left">
              <WingSvg side="left" />
            </div>

            {/* ── CENTRAL MENU PANEL ── */}
            <div className="sp-menu-panel">
              {/* Wing-to-panel connectors */}
              <div className="sp-wing-connector left" />
              <div className="sp-wing-connector right" />

              {/* ── ORNATE FRAME PANEL — hidden until blackhole finishes ── */}
              <div className={bodyPhase === 'closed' ? 'sp-panel-closed' : bodyPhase === 'opening' ? 'sp-panel-unrolling' : 'sp-panel-done'} style={{
                position: 'relative',
                opacity: bodyPhase === 'closed' ? 0 : 1,
                transition: bodyPhase !== 'closed' ? 'opacity 0.3s ease' : 'none',
              }}>

                {/* Panel body wrapped for the unroll reveal animation */}
                <div className={`sp-scroll-unroll-wrap${bodyPhase === 'opening' ? ' sp-body-opening' : bodyPhase === 'open' ? ' sp-body-open' : ''}`}>
                <div className="sp-scroll-body">
                  <div className={`sp-scroll-inner${itemsVisible ? ' sp-items-visible' : ''}`}>
                    {/* Menu items */}
                    {MENU_ITEMS.map((item,i)=>(
                      <div key={item.label} className={`sp-item sp-item-${i}`}>
                        <button
                          className={`sp-btn${active===i?' sp-active':''}`}
                          onMouseEnter={()=>{ setActive(i); aimAt(); }}
                          onClick={()=>choose(item.href,i)}
                        >
                          <span className="sp-btn-icon">{item.icon}</span>
                          <span>{item.label}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>{/* end sp-scroll-body */}

                </div>{/* end sp-scroll-unroll-wrap */}

              </div>
            </div>

            {/* ── RIGHT WING ── */}
            <div className="sp-wing-right">
              <WingSvg side="right" />
            </div>

          </div>

        </div>{/* end sp-stage */}
        </div>{/* end sp-frame-wrap */}

        {/* HUD — RPG dialogue box */}
        <div className="sp-hud">
          <div className="sp-hud-corner-bl" />
          <div className="sp-hud-corner-br" />
          <HudDialogue />
        </div>

      </div>
    </>
  );
}

export default SplashScreen;
