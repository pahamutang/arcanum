import Reveal from './Reveal';

function Services({ onOpenModal }) {
  const services = [
    { num:'01', title:'Architectural Design', desc:'From conceptual sketches to construction documents — residential, commercial, and mixed-use projects that transcend the expected.', detail:'Our architectural design service spans the full journey from first sketch to permit-ready documentation. We balance site context, client lifestyle, and structural integrity to produce buildings that feel inevitable — as if they could exist nowhere else. Every project begins with deep site analysis and ends with construction documents precise enough to build from.', included:['Concept sketches & massing studies','Schematic & design development drawings','Construction documentation','Permit & regulatory liaison','Material & finish specification'], icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="6" y="20" width="36" height="22"/><polygon points="2,20 24,6 46,20"/><rect x="18" y="30" width="12" height="12"/><line x1="24" y1="6" x2="24" y2="2"/><line x1="14" y1="20" x2="14" y2="30"/><line x1="34" y1="20" x2="34" y2="30"/></svg> },
    { num:'02', title:'Interior Design', desc:'Curated interiors that speak to the soul — space planning, material curation, lighting design, and bespoke furnishing direction.', detail:'Interiors are where architecture becomes lived experience. We approach every interior as a continuation of the building\'s structural logic — never decoration applied after the fact. Space planning, lighting, material palettes, and furnishing direction are considered together, from the first floor plan to the final styling pass.', included:['Space planning & flow studies','Material & finish curation','Custom lighting design','Furniture & fixture sourcing','Styling & final walkthrough'], icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="4" y="4" width="40" height="40"/><rect x="4" y="14" width="40" height="1"/><rect x="14" y="4" width="1" height="40"/><rect x="10" y="20" width="6" height="6"/><rect x="22" y="20" width="6" height="6"/><rect x="34" y="20" width="6" height="6"/><rect x="10" y="32" width="6" height="6"/><rect x="22" y="32" width="6" height="6"/><rect x="34" y="32" width="6" height="6"/></svg> },
    { num:'03', title:'3D Visualization', desc:'Photo-realistic renderings and immersive walkthroughs that bring your project to life before a single brick is laid.', detail:'Seeing a space before it exists changes everything about how a project is approved, funded, and built. Our visualization team produces photo-realistic renders and immersive walkthroughs that let clients, investors, and contractors stand inside a building months before groundbreak.', included:['Photo-realistic exterior renders','Interior render sets','Immersive 3D walkthroughs','Material & lighting studies','Animation for presentations'], icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="24" cy="24" r="20"/><path d="M24 4 L24 44 M4 24 L44 24"/><path d="M8 12 L40 36 M8 36 L40 12"/><circle cx="24" cy="24" r="6"/></svg> },
    { num:'04', title:'Master Planning', desc:'Holistic site and urban planning services that balance density, community, environment, and long-term viability.', detail:'Master planning operates at the scale of communities, not single buildings. We study density, circulation, environmental impact, and long-term viability together — producing site plans that remain coherent as a development grows over years or decades.', included:['Site & feasibility analysis','Zoning & density studies','Circulation & infrastructure planning','Phasing & long-term growth strategy','Environmental impact considerations'], icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="6" y="6" width="36" height="36"/><path d="M6 18 L42 18 M6 30 L42 30 M18 6 L18 42 M30 6 L30 42"/><circle cx="18" cy="18" r="3" fill="currentColor" stroke="none" opacity="0.5"/><circle cx="30" cy="30" r="3" fill="currentColor" stroke="none" opacity="0.5"/></svg> },
    { num:'05', title:'Construction Management', desc:'End-to-end project oversight ensuring quality, timeline, and budget integrity from groundbreak to handover.', detail:'Design intent is only as good as its execution on site. Our construction management team provides end-to-end oversight — coordinating contractors, tracking budget and timeline, and holding every detail to the standard set in the design phase, from groundbreak through to handover.', included:['Contractor coordination & bidding','Budget & timeline tracking','On-site quality oversight','Progress reporting','Handover & punch-list management'], icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 40 L8 16 L24 6 L40 16 L40 40"/><rect x="16" y="28" width="16" height="12"/><rect x="12" y="20" width="8" height="8"/><rect x="28" y="20" width="8" height="8"/><line x1="24" y1="6" x2="24" y2="2"/></svg> },
    { num:'06', title:'Sustainable Design', desc:'Green building practices, passive design strategies, and materials sourced for ecological and aesthetic harmony.', detail:'Sustainability is not a checklist — it is a design discipline. We integrate passive heating and cooling, responsible material sourcing, and energy-conscious systems from the earliest concept stage, so ecological performance and aesthetic intent grow from the same set of decisions.', included:['Passive design strategy','Sustainable material sourcing','Energy-efficient systems integration','Daylighting & natural ventilation studies','Certification guidance (e.g. BERDE, LEED)'], icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M24 4 C12 4 4 12 4 24 C4 36 12 44 24 44 C36 44 44 36 44 24"/><path d="M30 10 L44 4 L38 18"/><circle cx="24" cy="24" r="8"/><path d="M24 16 L24 24 L32 24"/></svg> },
  ];
  return (
    <section id="services">
      <div className="services-header">
        <div>
          <Reveal as="p" className="section-label">What We Do</Reveal>
          <Reveal as="h2" className="section-title" delay={0.1}>Our <em>Expertise</em></Reveal>
        </div>
      </div>
      <div className="services-grid">
        {services.map((s, i) => (
          <Reveal as="div" key={i} className="service-card" delay={(i % 3) * 0.1}>
            <div className="service-num">{s.num}</div>
            <div className="service-icon">{s.icon}</div>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
            <a href="#" className="service-link" onClick={e => { e.preventDefault(); onOpenModal(s); }}>
              Explore Service <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6"/></svg>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Services;
