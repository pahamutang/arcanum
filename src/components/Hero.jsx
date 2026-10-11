function Hero({ onNavigate, onBeginProject }) {
  return (
    <section id="hero">
      <div className="hero-bg">
        <div className="hero-bg-img" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">Where Vision<br/>Meets <em>Craft</em></h1>
        <div className="hero-divider" />
        <p className="hero-desc">We design and build spaces that endure — merging the precision of Japanese craftsmanship with the boldness of contemporary architecture.</p>
        <div className="hero-actions">
          <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); (onBeginProject || (() => onNavigate('contact')))(); }}>
            <span>✦ Begin Your Project</span>
          </a>
          <a href="#" className="btn-outline" onClick={e => { e.preventDefault(); onNavigate('portfolio'); }}>
            View Our Work →
          </a>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

export default Hero;
