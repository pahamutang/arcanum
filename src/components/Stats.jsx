import { useState, useEffect, useRef } from 'react';
import { useCounter } from '../hooks/useCounter';

function Stats() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const c1 = useCounter(5, '', started);
  const c2 = useCounter(28, 'yr', started);
  const c3 = useCounter(97, '%', started);
  const c4 = useCounter(14, '+', started);
  const stats = [{ val: c1, label: 'Active Projects' }, { val: c2, label: 'Years of Practice' }, { val: c3, label: 'Client Satisfaction' }, { val: c4, label: 'Industry Awards' }];

  return (
    <section id="stats" ref={sectionRef}>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
