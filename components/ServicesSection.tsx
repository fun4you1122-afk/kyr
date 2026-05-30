'use client';

const RentIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12L14 3l11 9v13a1 1 0 01-1 1H4a1 1 0 01-1-1V12z"/>
    <path d="M10 26V16h8v10"/>
  </svg>
);
const BuyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="14" cy="14" r="11"/>
    <path d="M14 8v2m0 8v2M10.5 12a3.5 3.5 0 017 0c0 4-7 6-7 10m7 0a3.5 3.5 0 01-7 0"/>
  </svg>
);
const ConsultIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20V8a2 2 0 012-2h20a2 2 0 012 2v8a2 2 0 01-2 2H8l-6 4z"/>
    <path d="M8 11h12M8 15h7"/>
  </svg>
);

const services = [
  { no: '01', Icon: RentIcon,    title: 'Rent',    desc: 'Find luxury apartments and villas in prime locations with flexible terms and seamless processing.' },
  { no: '02', Icon: BuyIcon,     title: 'Buy',     desc: 'Discover off-plan gems and ready properties tailored precisely to your lifestyle and budget.' },
  { no: '03', Icon: ConsultIcon, title: 'Consult', desc: 'Expert advice on market trends, ROI, and property valuation from our seasoned agents.' },
];

export function ServicesSection() {
  return (
    <section className="services panel" id="services">
      <div className="wrap">
        <div className="services__head">
          <h2 className="split">Your next strategic move</h2>
          <p className="up">
            Whether you seek your dream home or a high-yield investment, KYR provides exclusive
            access to Dubai&apos;s most coveted properties.
          </p>
        </div>
        {services.map(({ no, Icon, title, desc }) => (
          <div key={no} className="srow" data-cursor="true" data-cursor-label={no}>
            <div className="srow__no">{no}</div>
            <div className="srow__title-wrap">
              <span className="srow__icon" style={{ color: 'var(--gold)', opacity: 0.8 }}><Icon /></span>
              <h3 className="srow__title">{title}</h3>
            </div>
            <p className="srow__desc">{desc}</p>
            <span className="srow__arr">→</span>
          </div>
        ))}
      </div>
    </section>
  );
}
