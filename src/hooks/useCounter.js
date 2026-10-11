import { useState, useEffect } from 'react';

/* ── COUNTER HOOK ──
   Animates a number counting up from 0 to `target` over 2s, with an
   ease-out cubic curve. Only starts once `started` becomes true (driven
   by an IntersectionObserver in the component using it, so the count-up
   plays when the stat actually scrolls into view). */
export function useCounter(target, suffix, started) {
  const [value, setValue] = useState("0" + suffix);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const duration = 2000;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, suffix]);
  return value;
}

export default useCounter;
