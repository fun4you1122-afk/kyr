'use client';

export function Hero() {
  return (
    <>
      {/* ── Section 1: Full-screen cinematic video ── */}
      <section className="hero-video-section" id="home">
        <div className="hero-video-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://www.kyr.ae/KYR%20LOGO%20WHITE.svg" alt="KYR Real Estate" id="heroLogo" />
          <p className="hero-video-tag">Dubai · Luxury Real Estate</p>
        </div>
        <div className="hero__scroll"><span className="ln" />Scroll to explore</div>
      </section>

      {/* ── Section 2: Dark-panel hero content ── */}
      <section className="hero panel" id="hero-content">
        <span className="hero__side">Est. — Dubai, UAE</span>
        <div className="hero__inner wrap">
          <span className="eyebrow hero__eyebrow">KYR Real Estate</span>
          {/* data-chars triggers char-level GSAP split in GSAPAnimations */}
          <h1 className="hero__title" id="heroTitle">
            <span className="title-line">Unlocking Dubai&apos;s</span>
            <span className="title-line"><em>Finest</em> Properties</span>
          </h1>
          <p className="hero__sub up">
            Redefining real estate through transparency, expertise, and precision — your trusted
            partner for off-plan and high-ROI properties in Dubai.
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
      </section>
    </>
  );
}
