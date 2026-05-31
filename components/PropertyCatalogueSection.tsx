interface Property {
  id: number;
  name: string;
  location: string;
  type: string;
  area: string;
  status: "Ready" | "Off-Plan";
  price: string;
  image: string;
}

const PROPERTIES: Property[] = [
  {
    id: 1,
    name: "One Palm",
    location: "Palm Jumeirah",
    type: "4BR Penthouse",
    area: "6,400 sqft",
    status: "Off-Plan",
    price: "AED 14,500,000",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85&fit=crop",
  },
  {
    id: 2,
    name: "Creek Vista Reserve",
    location: "Dubai Creek Harbour",
    type: "2BR Apartment",
    area: "1,820 sqft",
    status: "Ready",
    price: "AED 3,200,000",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=85&fit=crop",
  },
  {
    id: 3,
    name: "Hartland Forest Villas",
    location: "MBR City",
    type: "5BR Villa",
    area: "9,200 sqft",
    status: "Ready",
    price: "AED 18,900,000",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85&fit=crop",
  },
  {
    id: 4,
    name: "Marina Gate",
    location: "Dubai Marina",
    type: "2BR Apartment",
    area: "1,380 sqft",
    status: "Ready",
    price: "AED 2,850,000",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85&fit=crop",
  },
  {
    id: 5,
    name: "Emaar Beachfront",
    location: "Dubai Harbour",
    type: "3BR Apartment",
    area: "2,100 sqft",
    status: "Off-Plan",
    price: "AED 7,400,000",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85&fit=crop",
  },
  {
    id: 6,
    name: "DG1 Downtown",
    location: "Downtown Dubai",
    type: "1BR Apartment",
    area: "1,050 sqft",
    status: "Off-Plan",
    price: "AED 1,950,000",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85&fit=crop",
  },
];

export function PropertyCatalogueSection() {
  return (
    <section className="props-section" id="catalogue">
      <div className="container">
        <div className="props-section__head">
          <div className="props-section__text">
            <span className="eyebrow">Featured Properties</span>
            <h2 className="props-section__title">
              Curated listings across Dubai&apos;s finest addresses.
            </h2>
          </div>
          <a href="#contact" className="props-section__all">
            View All Properties →
          </a>
        </div>

        <div className="props-grid">
          {PROPERTIES.map((prop) => (
            <article className="prop-card" key={prop.id}>
              <a href="#contact" className="prop-card__img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={prop.image} alt={prop.name} loading="lazy" />
                <span
                  className={`prop-card__badge prop-card__badge--${prop.status === "Ready" ? "ready" : "offplan"}`}
                >
                  {prop.status}
                </span>
              </a>
              <div className="prop-card__body">
                <p className="prop-card__location">{prop.location}</p>
                <h3 className="prop-card__name">{prop.name}</h3>
                <div className="prop-card__row">
                  <span>{prop.type}</span>
                  <span>{prop.area}</span>
                </div>
                <div className="prop-card__footer">
                  <strong className="prop-card__price">{prop.price}</strong>
                  <a href="#contact" className="prop-card__link">
                    Enquire →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
