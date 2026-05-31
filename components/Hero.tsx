export function Hero() {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero__grid">
          {/* Left column — 55% */}
          <div className="hero__left">
            <span className="eyebrow">Luxury Real Estate · Dubai, UAE</span>
            <h1 className="hero__title">
              Where Dubai&apos;s finest properties meet the right buyer.
            </h1>
            <p className="hero__sub">
              KYR connects qualified buyers with exceptional properties across Dubai&apos;s most
              prestigious addresses — with complete transparency and proven results.
            </p>
            <div className="hero__actions">
              <a href="#catalogue" className="btn-primary">Browse Properties</a>
              <a href="#contact" className="btn-ghost">Schedule a Call</a>
            </div>
          </div>

          {/* Right column — 45% */}
          <div className="hero__right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85&fit=crop"
              alt="Luxury villa exterior in Dubai"
            />
            <div className="hero__badge">500+ Transactions · AED 2B+ Closed</div>
          </div>
        </div>

        {/* Stats band — full width, dark bg */}
        <div className="hero__stats">
          <div className="hero__stat">
            <strong>500+</strong>
            <span>Properties Sold</span>
          </div>
          <div className="hero__stat">
            <strong>AED 2B+</strong>
            <span>Total Value</span>
          </div>
          <div className="hero__stat">
            <strong>8 Years</strong>
            <span>In Market</span>
          </div>
          <div className="hero__stat">
            <strong>98%</strong>
            <span>Client Satisfaction</span>
          </div>
        </div>
      </section>
    </>
  );
}
