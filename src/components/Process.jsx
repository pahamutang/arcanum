import Reveal from './Reveal';

function Process() {
  const steps = [
    { num:'一', title:'Discovery', desc:'We listen deeply. Understanding your vision, lifestyle, site conditions, and aspirations is the foundation of everything we create.' },
    { num:'二', title:'Concept Design', desc:'Translating insights into form — spatial narratives, material palettes, and massing studies that capture the essence of your brief.' },
    { num:'三', title:'Development', desc:'Refining every detail: technical drawings, engineering coordination, regulatory approvals, and construction documentation.' },
    { num:'四', title:'Realisation', desc:'On-site, hands-on — overseeing construction with the same exacting standards that defined the design phase from day one.' },
  ];
  return (
    <section id="process">
      <Reveal as="p" className="section-label">How We Work</Reveal>
      <Reveal as="h2" className="section-title" delay={0.1}>The <em>Arcanum</em> Process</Reveal>
      <div className="process-grid">
        {steps.map((s, i) => (
          <Reveal as="div" key={i} className="process-step" delay={(i + 1) * 0.1}>
            <div className="process-num">{s.num}</div>
            <h3 className="process-title">{s.title}</h3>
            <p className="process-desc">{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Process;
