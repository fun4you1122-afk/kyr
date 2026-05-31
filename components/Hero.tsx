export function Hero() {
  return (
    <section className="hero" id="top">
      {/* Background image */}
      <div className="hero__bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=90&fit=crop"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="hero__overlay" />

      {/* Centred content */}
      <div className="hero__content">
        <span className="hero__eyebrow">Dubai · Luxury Real Estate</span>
        <h1 className="hero__title">
          Dubai&apos;s Premier<br />Real Estate Partner
        </h1>
        <p className="hero__sub">
          Connecting discerning buyers with exceptional properties across
          Palm Jumeirah, Downtown, Dubai Marina, and beyond.
        </p>
        <div className="hero__actions">
          <a href="#catalogue" className="btn-primary">Explore Properties</a>
          <a href="#contact" className="btn-outline-white">Register Interest</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint">
        <span>Scroll</span>
        <div className="hero__scroll-bar" />
      </div>
    </section>
  );
}
