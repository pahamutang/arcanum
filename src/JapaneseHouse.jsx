import { useRef, useState } from 'react';
import './JapaneseHouse.css';

/* ═══════════════════════════════════════════
   JAPANESE HOUSE — Interactive 3D-style illustration
   PLACEHOLDER: your original project has its own real
   Three.js-based JapaneseHouse component. That file wasn't
   part of the App.jsx you gave me to split, so I don't have
   its source. This is a dependency-free stand-in (pure CSS
   3D transforms, no WebGL/three.js) so the site has a working,
   good-looking, on-brand piece here instead of a blank gap —
   swap this file out for your real one whenever you're ready.

   It responds to mouse movement with a real perspective tilt
   (rotateX/rotateY driven by cursor position), built from
   layered SVG shapes rather than a 3D engine.
═══════════════════════════════════════════ */
export default function JapaneseHouse() {
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 18 });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="jh-stage">
      <div
        className="jh-wrap"
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {/* Ground / base platform */}
        <div className="jh-layer jh-ground" />

        {/* Back wall + structure */}
        <svg className="jh-layer jh-svg" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          {/* Base platform */}
          <ellipse cx="200" cy="260" rx="170" ry="22" fill="rgba(0,0,0,0.35)" />

          {/* Main structure walls */}
          <rect x="90" y="140" width="220" height="110" fill="#1c1712" stroke="rgba(212,180,100,0.25)" strokeWidth="1.5" />
          <rect x="90" y="140" width="220" height="110" fill="url(#jhWallGrad)" opacity="0.6" />

          {/* Support pillars */}
          <rect x="95" y="140" width="8" height="110" fill="#2a2118" />
          <rect x="297" y="140" width="8" height="110" fill="#2a2118" />
          <rect x="196" y="140" width="8" height="110" fill="#2a2118" opacity="0.7" />

          {/* Sliding door / shoji screens */}
          <rect x="150" y="165" width="100" height="80" fill="rgba(212,180,100,0.08)" stroke="rgba(212,180,100,0.4)" strokeWidth="1" />
          <line x1="175" y1="165" x2="175" y2="245" stroke="rgba(212,180,100,0.3)" strokeWidth="1" />
          <line x1="200" y1="165" x2="200" y2="245" stroke="rgba(212,180,100,0.3)" strokeWidth="1" />
          <line x1="225" y1="165" x2="225" y2="245" stroke="rgba(212,180,100,0.3)" strokeWidth="1" />
          <rect className="jh-glow-window" x="150" y="165" width="100" height="80" fill="rgba(255,200,110,0.18)" />

          {/* Roof — main sweeping eave */}
          <path d="M 55 140 Q 200 40 345 140 L 320 150 Q 200 65 80 150 Z" fill="#0f0d0a" stroke="rgba(212,180,100,0.35)" strokeWidth="1.5" />
          <path d="M 55 140 Q 200 40 345 140" fill="none" stroke="rgba(212,180,100,0.5)" strokeWidth="2" />

          {/* Roof ridge highlight */}
          <path d="M 90 130 Q 200 55 310 130" fill="none" stroke="rgba(212,180,100,0.25)" strokeWidth="1" />

          {/* Upturned eave tips */}
          <path d="M 55 140 Q 40 128 48 112" fill="none" stroke="rgba(212,180,100,0.5)" strokeWidth="2" />
          <path d="M 345 140 Q 360 128 352 112" fill="none" stroke="rgba(212,180,100,0.5)" strokeWidth="2" />

          {/* Lanterns */}
          <g className="jh-lantern">
            <line x1="115" y1="150" x2="115" y2="165" stroke="rgba(212,180,100,0.4)" strokeWidth="1" />
            <rect x="107" y="165" width="16" height="20" rx="3" fill="rgba(255,190,90,0.55)" />
          </g>
          <g className="jh-lantern jh-lantern-2">
            <line x1="285" y1="150" x2="285" y2="165" stroke="rgba(212,180,100,0.4)" strokeWidth="1" />
            <rect x="277" y="165" width="16" height="20" rx="3" fill="rgba(255,190,90,0.55)" />
          </g>

          <defs>
            <linearGradient id="jhWallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a2118" />
              <stop offset="100%" stopColor="#161210" />
            </linearGradient>
          </defs>
        </svg>

        {/* Foreground pine silhouette, sits closer in the tilt stack */}
        <svg className="jh-layer jh-pine" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.85">
            <path d="M 40 250 Q 30 220 45 200 Q 55 215 55 200 Q 65 218 62 195 Q 74 210 68 185 L 55 185 L 58 250 Z" fill="#0a1108" />
          </g>
        </svg>
      </div>

      <p className="jh-hint">Move your cursor to look around</p>
    </div>
  );
}
