/* ═══════════════════════════════════════════
   WING SVG — Golden Angel Wing
   side: 'left' | 'right'  (right is mirrored)
═══════════════════════════════════════════ */
function WingSvg({ side }) {
  const flip = side === 'right';
  // viewBox: wing spreads from center-right outward to the left
  // We'll draw a left-facing wing and mirror via CSS for right
  return (
    <svg
      viewBox="0 0 160 260"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '100%', height: 'auto', display: 'block', overflow: 'visible',
        transform: flip ? 'scaleX(-1)' : 'none',
      }}
    >
      <defs>
        {/* Main gold gradient — light hits top-right of each feather */}
        <linearGradient id={`wMain-${side}`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#fff3c0"/>
          <stop offset="12%"  stopColor="#f5c84a"/>
          <stop offset="35%"  stopColor="#c8820a"/>
          <stop offset="60%"  stopColor="#8a4c08"/>
          <stop offset="85%"  stopColor="#5c2d04"/>
          <stop offset="100%" stopColor="#2e1202"/>
        </linearGradient>
        {/* Lighter gold for feather fronts */}
        <linearGradient id={`wLight-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffe8a0"/>
          <stop offset="30%"  stopColor="#e8a830"/>
          <stop offset="70%"  stopColor="#9a5812"/>
          <stop offset="100%" stopColor="#4e2408"/>
        </linearGradient>
        {/* Deep shadow for feather undersides */}
        <linearGradient id={`wDark-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#c87818"/>
          <stop offset="50%"  stopColor="#6a3a08"/>
          <stop offset="100%" stopColor="#2a1002"/>
        </linearGradient>
        {/* Quill spine highlight */}
        <linearGradient id={`wSpine-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(255,240,160,0.9)"/>
          <stop offset="100%" stopColor="rgba(255,200,80,0.1)"/>
        </linearGradient>
        {/* Central body base */}
        <linearGradient id={`wBody-${side}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="#f0c050"/>
          <stop offset="30%"  stopColor="#c07820"/>
          <stop offset="70%"  stopColor="#7a3c08"/>
          <stop offset="100%" stopColor="#3a1804"/>
        </linearGradient>
        <filter id={`wShadow-${side}`}>
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.7"/>
        </filter>
        <filter id={`wGlow-${side}`}>
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="rgba(220,150,30,0.7)" floodOpacity="1"/>
        </filter>
      </defs>

      {/* ═══ WING BODY / BASE ═══ */}
      {/* Main spine running from top (attach point) down to tip */}
      <path
        d="M95,10 C90,30 82,60 78,100 C74,140 75,180 80,220 C82,235 84,248 85,258"
        stroke={`url(#wSpine-${side})`} strokeWidth="3.5" fill="none"
        strokeLinecap="round"
        filter={`url(#wGlow-${side})`}
      />
      {/* Secondary spine curve */}
      <path
        d="M95,10 C90,30 82,60 78,100 C74,140 75,180 80,220 C82,235 84,248 85,258"
        stroke="rgba(255,245,180,0.4)" strokeWidth="1.2" fill="none"
        strokeLinecap="round"
      />

      {/* ═══ UPPER LARGE PRIMARY FEATHERS (rows spread wide) ═══ */}

      {/* Primary 1 — topmost, sweeps out hard */}
      <path d="M93,18 C80,8 40,-2 10,5 C5,18 12,30 25,30 C50,30 75,26 90,22 Z"
        fill={`url(#wMain-${side})`} filter={`url(#wShadow-${side})`}/>
      <path d="M93,18 C80,8 40,-2 10,5 C5,18 12,30 25,30 C50,30 75,26 90,22 Z"
        fill="none" stroke="rgba(255,210,80,0.5)" strokeWidth="0.9"/>
      <line x1="90" y1="20" x2="15" y2="8" stroke={`url(#wSpine-${side})`} strokeWidth="1.1"/>

      {/* Primary 2 */}
      <path d="M91,30 C75,18 35,8 6,18 C1,32 8,44 22,44 C48,44 72,38 88,34 Z"
        fill={`url(#wMain-${side})`} filter={`url(#wShadow-${side})`}/>
      <path d="M91,30 C75,18 35,8 6,18 C1,32 8,44 22,44 C48,44 72,38 88,34 Z"
        fill="none" stroke="rgba(255,200,70,0.45)" strokeWidth="0.8"/>
      <line x1="88" y1="32" x2="10" y2="22" stroke={`url(#wSpine-${side})`} strokeWidth="1.0"/>

      {/* Primary 3 */}
      <path d="M89,44 C72,30 30,22 3,34 C-2,50 6,62 20,62 C46,62 70,54 86,48 Z"
        fill={`url(#wMain-${side})`} filter={`url(#wShadow-${side})`}/>
      <path d="M89,44 C72,30 30,22 3,34 C-2,50 6,62 20,62 C46,62 70,54 86,48 Z"
        fill="none" stroke="rgba(255,195,65,0.4)" strokeWidth="0.8"/>
      <line x1="86" y1="46" x2="6" y2="38" stroke={`url(#wSpine-${side})`} strokeWidth="0.9"/>

      {/* Primary 4 */}
      <path d="M86,60 C68,44 25,36 0,52 C-4,68 5,82 18,82 C44,82 68,72 83,64 Z"
        fill={`url(#wLight-${side})`} filter={`url(#wShadow-${side})`}/>
      <path d="M86,60 C68,44 25,36 0,52 C-4,68 5,82 18,82 C44,82 68,72 83,64 Z"
        fill="none" stroke="rgba(255,190,60,0.4)" strokeWidth="0.8"/>
      <line x1="83" y1="62" x2="4" y2="56" stroke={`url(#wSpine-${side})`} strokeWidth="0.9"/>

      {/* ═══ MIDDLE SECONDARY FEATHERS (slightly shorter, angle shifts) ═══ */}

      {/* Secondary 1 */}
      <path d="M83,78 C65,60 22,54 -2,72 C-6,90 4,104 16,103 C40,102 64,90 80,82 Z"
        fill={`url(#wMain-${side})`} filter={`url(#wShadow-${side})`}/>
      <path d="M83,78 C65,60 22,54 -2,72 C-6,90 4,104 16,103 C40,102 64,90 80,82 Z"
        fill="none" stroke="rgba(255,185,55,0.38)" strokeWidth="0.8"/>
      <line x1="80" y1="80" x2="2" y2="76" stroke={`url(#wSpine-${side})`} strokeWidth="0.85"/>

      {/* Secondary 2 */}
      <path d="M81,96 C62,76 18,72 -4,92 C-8,112 3,126 15,124 C38,122 62,108 78,100 Z"
        fill={`url(#wLight-${side})`} filter={`url(#wShadow-${side})`}/>
      <path d="M81,96 C62,76 18,72 -4,92 C-8,112 3,126 15,124 C38,122 62,108 78,100 Z"
        fill="none" stroke="rgba(255,180,50,0.36)" strokeWidth="0.75"/>
      <line x1="78" y1="98" x2="0" y2="96" stroke={`url(#wSpine-${side})`} strokeWidth="0.8"/>

      {/* Secondary 3 */}
      <path d="M80,114 C60,92 16,90 -5,112 C-9,134 2,148 14,145 C36,142 60,126 77,118 Z"
        fill={`url(#wMain-${side})`} filter={`url(#wShadow-${side})`}/>
      <path d="M80,114 C60,92 16,90 -5,112 C-9,134 2,148 14,145 C36,142 60,126 77,118 Z"
        fill="none" stroke="rgba(255,175,45,0.34)" strokeWidth="0.75"/>
      <line x1="77" y1="116" x2="0" y2="116" stroke={`url(#wSpine-${side})`} strokeWidth="0.8"/>

      {/* ═══ LOWER TERTIARY FEATHERS (tip area, curving inward) ═══ */}

      {/* Tertiary 1 */}
      <path d="M79,134 C58,110 14,108 -4,132 C-7,155 3,168 14,164 C35,160 58,144 76,136 Z"
        fill={`url(#wDark-${side})`} filter={`url(#wShadow-${side})`}/>
      <path d="M79,134 C58,110 14,108 -4,132 C-7,155 3,168 14,164 C35,160 58,144 76,136 Z"
        fill="none" stroke="rgba(255,170,40,0.3)" strokeWidth="0.7"/>
      <line x1="76" y1="135" x2="0" y2="136" stroke={`url(#wSpine-${side})`} strokeWidth="0.75"/>

      {/* Tertiary 2 */}
      <path d="M80,154 C58,128 12,128 -2,154 C-4,178 6,190 16,186 C36,180 58,162 78,156 Z"
        fill={`url(#wDark-${side})`} filter={`url(#wShadow-${side})`}/>
      <path d="M80,154 C58,128 12,128 -2,154 C-4,178 6,190 16,186 C36,180 58,162 78,156 Z"
        fill="none" stroke="rgba(255,165,35,0.28)" strokeWidth="0.7"/>
      <line x1="78" y1="155" x2="2" y2="158" stroke={`url(#wSpine-${side})`} strokeWidth="0.7"/>

      {/* ═══ TIP FEATHERS (fanning out, narrow & long) ═══ */}

      {/* Tip 1 — sweeps up-left */}
      <path d="M82,172 C70,148 50,138 32,145 C20,155 22,172 34,176 C52,180 70,176 80,174 Z"
        fill={`url(#wLight-${side})`} filter={`url(#wShadow-${side})`}/>
      <line x1="80" y1="173" x2="34" y2="152" stroke={`url(#wSpine-${side})`} strokeWidth="0.7"/>

      {/* Tip 2 */}
      <path d="M83,186 C72,160 50,150 28,158 C14,170 16,190 30,194 C50,198 70,192 82,188 Z"
        fill={`url(#wMain-${side})`} filter={`url(#wShadow-${side})`}/>
      <line x1="81" y1="187" x2="30" y2="163" stroke={`url(#wSpine-${side})`} strokeWidth="0.7"/>

      {/* Tip 3 — longest tip feather */}
      <path d="M84,202 C74,172 50,160 24,170 C8,184 10,208 26,212 C48,216 70,208 83,204 Z"
        fill={`url(#wMain-${side})`} filter={`url(#wShadow-${side})`}/>
      <line x1="82" y1="203" x2="26" y2="176" stroke={`url(#wSpine-${side})`} strokeWidth="0.75"/>

      {/* Tip 4 — sweeps downward */}
      <path d="M85,218 C76,186 52,172 26,182 C8,198 10,226 28,230 C50,234 72,222 84,220 Z"
        fill={`url(#wDark-${side})`} filter={`url(#wShadow-${side})`}/>
      <line x1="83" y1="219" x2="28" y2="188" stroke={`url(#wSpine-${side})`} strokeWidth="0.7"/>

      {/* Tip 5 — lowest tip, curls under */}
      <path d="M86,234 C78,200 56,184 30,196 C12,214 14,244 32,248 C54,252 74,238 85,236 Z"
        fill={`url(#wDark-${side})`} filter={`url(#wShadow-${side})`}/>
      <line x1="84" y1="235" x2="30" y2="202" stroke={`url(#wSpine-${side})`} strokeWidth="0.7"/>

      {/* ═══ ATTACHMENT BASE — jeweled boss where wing meets panel ═══ */}
      <ellipse cx="92" cy="12" rx="10" ry="8"
        fill={`url(#wBody-${side})`} filter={`url(#wShadow-${side})`}/>
      <ellipse cx="92" cy="12" rx="10" ry="8"
        fill="none" stroke="rgba(255,220,100,0.6)" strokeWidth="1.2"/>
      <ellipse cx="92" cy="12" rx="7" ry="5"
        fill="none" stroke="rgba(20,8,2,0.5)" strokeWidth="1.0"/>
      <ellipse cx="91" cy="11" rx="4" ry="3"
        fill="rgba(255,245,200,0.7)"/>
      <ellipse cx="90" cy="10.5" rx="1.5" ry="1"
        fill="rgba(255,255,240,0.9)"/>
    </svg>
  );
}

export default WingSvg;
