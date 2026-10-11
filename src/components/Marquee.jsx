function Marquee() {
  const items = ['Architectural Design','Interior Design','Construction Management','3D Visualization','Residential & Commercial','Sustainable Design','Master Planning'];
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => <span key={i} className="marquee-item">{item}</span>)}
      </div>
    </div>
  );
}

export default Marquee;
