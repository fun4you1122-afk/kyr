const services = [
  {
    number: "01",
    title: "Property Sales & Acquisition",
    description:
      "From luxury apartments to landmark villas, we match buyers with properties that align with their goals — whether for lifestyle, investment, or legacy.",
  },
  {
    number: "02",
    title: "Off-Plan Investments",
    description:
      "Access curated off-plan projects from Dubai's top developers before public launch, with comprehensive ROI analysis and payment plan structuring.",
  },
  {
    number: "03",
    title: "Golden Visa Advisory",
    description:
      "Secure your 10-year UAE residency through strategic real estate investment. We handle the entire process from property selection to PRO submission.",
  },
  {
    number: "04",
    title: "Portfolio Management",
    description:
      "Hands-off asset management — tenant screening, leasing, rent collection, and maintenance — so your investment performs without the hassle.",
  },
];

export function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-section__head">
          <span className="eyebrow">What We Do</span>
          <h2 className="section-title">
            Comprehensive real estate services, delivered with precision.
          </h2>
        </div>

        <div className="svc-grid">
          {services.map((svc) => (
            <div key={svc.number} className="svc-card">
              <span className="svc-card__number">{svc.number}</span>
              <h3 className="svc-card__title">{svc.title}</h3>
              <p className="svc-card__desc">{svc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
