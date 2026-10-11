/* ── Crystal shard data ── */
export const SHARDS = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const dist  = 80 + Math.random() * 140;
  return {
    tx: `${Math.cos(angle) * dist}px`,
    ty: `${Math.sin(angle) * dist - 30}px`,
    rot: `${(Math.random() - 0.5) * 180}deg`,
    dur: `${0.8 + Math.random() * 0.7}s`,
    delay: `${1.2 + Math.random() * 0.5}s`,
    size: 3 + Math.random() * 7,
    color: i % 3 === 0
      ? 'rgba(255,252,245,0.9)'
      : i % 3 === 1
      ? 'rgba(212,180,100,0.7)'
      : 'rgba(240,235,225,0.95)',
  };
});

/* ═══════════════════════════════════════════
   AUDIO MANAGER — handles intro + menu music
   Browsers block autoplay; music starts on
   first user interaction (the Enter click).
═══════════════════════════════════════════ */

