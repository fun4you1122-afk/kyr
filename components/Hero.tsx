'use client';
export function Hero() {
  return (
    <section className="hero" id="home">
      <span className="hero__side">Est. — Dubai, UAE</span>
      <div className="hero__inner wrap">
        <span className="eyebrow hero__eyebrow">KYR Real Estate</span>
        <h1 className="hero__title">
          <span className="line"><span className="line-i">Unlocking Dubai&apos;s</span></span>
          <span className="line"><span className="line-i"><em>Finest</em> Properties</span></span>
        </h1>
        <p className="hero__sub up">
          Redefining real estate through transparency, expertise, and precision — your trusted partner for
          off-plan and high-ROI properties in Dubai.
        </p>
        <div className="hero__actions up">
          <a className="btn btn--gold magnetic" href="#contact" data-cursor="true">
            <span className="magnetic__inner">Book a Consultation <i className="arr">→</i></span>
          </a>
          <a className="btn btn--ghost magnetic" href="#standard" data-cursor="true">
            <span className="magnetic__inner">View Portfolio</span>
          </a>
        </div>
      </div>
      <div className="hero__scroll"><span className="ln" />Scroll to explore</div>
    </section>
  );
}
