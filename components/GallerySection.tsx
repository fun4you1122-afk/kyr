'use client';
const GCS = 'https://storage.googleapis.com/kyrwebsite-frontend-620364934597/KYR%20Banners';

export function GallerySection() {
  return (
    <section className="gallery" id="standard">
      <div className="gallery__track" id="galleryTrack" data-cursor="true" data-cursor-label="Drag">
        <article className="gpanel gpanel--intro">
          <span className="eyebrow">The KYR Standard</span>
          <h2>A portfolio<br />defined by <em>elegance</em>.</h2>
          <p>
            Hand-selected residences and investments across Dubai&apos;s most prestigious addresses —
            curated for those who measure value in decades, not days.
          </p>
          <span className="gpanel__hint">Scroll →</span>
        </article>

        <article className="gpanel gpanel--img">
          <div className="gpanel__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${GCS}/Beyond%20luxry%20Its%20Elegance%20elevated%20to%20elite.jpg`}
              alt="Beyond luxury — elegance elevated to elite"
            />
          </div>
          <div className="gpanel__cap">
            <span>01 — Signature</span>
            <h3>Beyond luxury. Elegance, elevated to elite.</h3>
          </div>
        </article>

        <article className="gpanel gpanel--img">
          <div className="gpanel__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${GCS}/luxury%20is%20the%20investment%20that%20never%20fades.jpg`}
              alt="Luxury is the investment that never fades"
            />
          </div>
          <div className="gpanel__cap">
            <span>02 — Enduring Value</span>
            <h3>Luxury is the investment that never fades.</h3>
          </div>
        </article>

        <article className="gpanel gpanel--img">
          <div className="gpanel__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${GCS}/Trust%20always%20growing%20with%20you%20on%20your%20property%20journey.jpg`}
              alt="Trust, always growing with you on your property journey"
            />
          </div>
          <div className="gpanel__cap">
            <span>03 — Partnership</span>
            <h3>Trust, always growing with you on your journey.</h3>
          </div>
        </article>

        <article className="gpanel gpanel--cta">
          <span className="eyebrow">Your move</span>
          <h2>Find your <em>position</em> in Dubai.</h2>
          <a className="btn btn--gold magnetic" href="#contact" data-cursor="true">
            <span className="magnetic__inner">Request Private Access <i className="arr">→</i></span>
          </a>
        </article>
      </div>
    </section>
  );
}
