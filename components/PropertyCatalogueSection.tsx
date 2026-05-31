'use client';

const GCS = 'https://storage.googleapis.com/kyrwebsite-frontend-620364934597/KYR%20Banners';

interface Property {
  id: number;
  name: string;
  location: string;
  type: string;
  area: string;
  status: string;
  price: string;
  roi: string;
  description: string;
  image: string;
  side: 'left' | 'right';
}

const PROPERTIES: Property[] = [
  {
    id: 0,
    name: 'One Palm',
    location: 'Palm Jumeirah',
    type: '4BR Penthouse',
    area: '6,400 sqft',
    status: 'Off-Plan · Q4 2026',
    price: 'AED 14,500,000',
    roi: '6.8% projected ROI',
    description:
      'Crowning the iconic crescent of Palm Jumeirah, these residences command unrivalled panoramic views of the Arabian Gulf and Dubai skyline — delivered with private infinity-pool terraces and full hotel services.',
    image: `${GCS}/Beyond%20luxry%20Its%20Elegance%20elevated%20to%20elite.jpg`,
    side: 'left',
  },
  {
    id: 1,
    name: 'Creek Vista Reserve',
    location: 'Dubai Creek Harbour',
    type: '2BR Apartment',
    area: '1,820 sqft',
    status: 'Ready to Move',
    price: 'AED 3,200,000',
    roi: '7.4% rental yield',
    description:
      'Positioned against the backdrop of Creek Island, these residences offer floor-to-ceiling glazing with direct water views, a curated wellness podium, and instant Downtown connectivity.',
    image: `${GCS}/luxury%20is%20the%20investment%20that%20never%20fades.jpg`,
    side: 'right',
  },
  {
    id: 2,
    name: 'Hartland Forest Villas',
    location: 'Mohammed Bin Rashid City',
    type: '5BR Villa',
    area: '9,200 sqft',
    status: 'Ready to Move',
    price: 'AED 18,900,000',
    roi: '5.2% projected ROI',
    description:
      'Enveloped by 7 million square feet of protected parkland, these signature villas deliver private pools, home automation, and a coveted address within minutes of the Burj Khalifa.',
    image: `${GCS}/Trust%20always%20growing%20with%20you%20on%20your%20property%20journey.jpg`,
    side: 'left',
  },
  {
    id: 3,
    name: 'Marina Gate',
    location: 'Dubai Marina',
    type: '2BR Apartment',
    area: '1,380 sqft',
    status: 'Ready to Move',
    price: 'AED 2,850,000',
    roi: '8.1% rental yield',
    description:
      'Rising from the waterfront promenade of Dubai Marina, these residences combine sweeping sea views with direct Marina Walk access and a world-class resident amenity suite.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=90&fit=crop',
    side: 'right',
  },
  {
    id: 4,
    name: 'Emaar Beachfront',
    location: 'Dubai Harbour',
    type: '3BR Apartment',
    area: '2,100 sqft',
    status: 'Off-Plan · Q2 2026',
    price: 'AED 7,400,000',
    roi: '6.5% projected ROI',
    description:
      'Steps from a private beach on Dubai Harbour\'s prestigious peninsula, these waterfront residences command unobstructed views of the Arabian Gulf and Palm Jumeirah.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=90&fit=crop',
    side: 'left',
  },
  {
    id: 5,
    name: 'DG1 Downtown',
    location: 'Downtown Dubai',
    type: '1BR Apartment',
    area: '1,050 sqft',
    status: 'Off-Plan · Q1 2025',
    price: 'AED 1,950,000',
    roi: '8.4% rental yield',
    description:
      'At the heart of Downtown Dubai\'s cultural district, DG1 apartments blend architectural precision with panoramic Burj Khalifa views — the city\'s most coveted residential address.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=90&fit=crop',
    side: 'right',
  },
];

export function PropertyCatalogueSection() {
  return (
    <section className="pcat" id="catalogue">
      {/* ── Section header ── */}
      <div className="pcat__header wrap">
        <span className="eyebrow up">Property Catalogue</span>
        <h2 className="pcat__title up">
          Curated for the <em>discerning</em> investor.
        </h2>
        <p className="pcat__sub up">
          Each listing is individually assessed for capital appreciation, rental yield, and location
          premium — positioned for those who invest with precision.
        </p>
      </div>

      {/* ── Desktop: scroll-driven book-flip catalogue ── */}
      <div className="pcat__scroll" id="pcatScroll">
        {PROPERTIES.map((prop) => (
          <div
            className="pcat__section"
            data-index={prop.id}
            data-side={prop.side}
            key={prop.id}
          >
            <div className="pcat__container">
              <div className="pcat__box">
                {/* Background property image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={prop.image} alt={prop.name} className="pcat__img" />

                {/* 3D flip overlay */}
                <div className={`pcat__overlay pcat__overlay--${prop.side}`}>

                  {/* Front face — shown before scroll opens it */}
                  <div className="pcat__front">
                    <div className="pcat__front-inner">
                      <span className="pcat__loc">{prop.location}</span>
                      <h2 className="pcat__name">{prop.name}</h2>
                      <div className="pcat__gem">✦</div>
                      <span className="pcat__tag">{prop.status}</span>
                    </div>
                  </div>

                  {/* Back face — two-page spread revealed after flip */}
                  <div className="pcat__back">
                    <div className="pcat__pg-left">
                      <span className="pcat__loc-back">{prop.location}</span>
                      <h3 className="pcat__back-name">{prop.name}</h3>
                      <p className="pcat__desc">{prop.description}</p>
                      <ul className="pcat__specs">
                        <li><span>Type</span>{prop.type}</li>
                        <li><span>Area</span>{prop.area}</li>
                        <li><span>Status</span>{prop.status}</li>
                        <li><span>Yield</span>{prop.roi}</li>
                      </ul>
                    </div>
                    <div className="pcat__pg-right">
                      <figure>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={prop.image} alt={prop.name} />
                      </figure>
                      <p className="pcat__price">{prop.price}</p>
                      <a className="pcat__cta" href="#contact">
                        Book Viewing <i className="arr">→</i>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Mobile: stacked cards ── */}
      <div className="pcat__mobile">
        {PROPERTIES.map((prop) => (
          <div className="pcat__mcard" key={prop.id}>
            <div className="pcat__mcard-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={prop.image} alt={prop.name} />
            </div>
            <div className="pcat__mcard-body">
              <span className="pcat__loc">{prop.location}</span>
              <h3 className="pcat__back-name">{prop.name}</h3>
              <p className="pcat__desc">{prop.description}</p>
              <ul className="pcat__specs">
                <li><span>Type</span>{prop.type}</li>
                <li><span>Area</span>{prop.area}</li>
                <li><span>Status</span>{prop.status}</li>
                <li><span>Yield</span>{prop.roi}</li>
              </ul>
              <p className="pcat__price">{prop.price}</p>
              <a className="pcat__cta pcat__cta--wide" href="#contact">
                Book Viewing <i className="arr">→</i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
