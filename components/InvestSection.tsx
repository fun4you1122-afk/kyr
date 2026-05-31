const checklistItems = [
  "Minimum investment: AED 2,000,000",
  "Covers spouse, children & domestic staff",
  "No minimum physical presence required",
  "KYR handles the entire PRO process",
];

export function InvestSection() {
  return (
    <section className="invest-section" id="invest">
      <div className="container">
        <div className="invest-section__inner">
          {/* Left: content */}
          <div className="invest-section__content">
            <span className="eyebrow">Residency Program</span>
            <h2 className="section-title invest-section__title">
              The UAE Golden Visa
            </h2>
            <p className="invest-section__body">
              Secure a 10-year renewable residency by investing in Dubai real
              estate — granting you and your family long-term stability, business
              advantages, and premium healthcare access.
            </p>
            <ul className="checklist">
              {checklistItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="btn-primary" href="#contact">
              Start Your Application
            </a>
          </div>

          {/* Right: image */}
          <div className="invest-section__image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85&fit=crop"
              alt="Dubai luxury real estate"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
