'use client';
const services = [
  { no: '01', title: 'Rent',    desc: 'Find luxury apartments and villas in prime locations with flexible terms and seamless processing.' },
  { no: '02', title: 'Buy',     desc: 'Discover off-plan gems and ready properties tailored precisely to your lifestyle and budget.' },
  { no: '03', title: 'Consult', desc: 'Expert advice on market trends, ROI, and property valuation from our seasoned agents.' },
];

export function ServicesSection() {
  return (
    <section className="services panel" id="services">
      <div className="wrap">
        <div className="services__head">
          <h2 className="split">Your next strategic move</h2>
          <p className="up">
            Whether you seek your dream home or a high-yield investment, KYR provides exclusive access
            to Dubai&apos;s most coveted properties.
          </p>
        </div>
        {services.map(s => (
          <div key={s.no} className="srow" data-cursor="true" data-cursor-label={s.no}>
            <div className="srow__no">{s.no}</div>
            <h3 className="srow__title">{s.title}</h3>
            <p className="srow__desc">{s.desc}</p>
            <span className="srow__arr">→</span>
          </div>
        ))}
      </div>
    </section>
  );
}
