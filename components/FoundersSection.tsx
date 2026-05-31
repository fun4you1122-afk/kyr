'use client';
const GCS = 'https://storage.googleapis.com/kyrwebsite-frontend-620364934597/KYR%20Banners';

const team = [
  { name: 'Yara',  role: 'Co-Founder',             img: `${GCS}/Yara%20co-founder.jpg` },
  { name: 'Rawad', role: 'Co-Founder',             img: `${GCS}/Rawad%20co-founder.jpg` },
  { name: 'Karim', role: 'Head of Administration', img: `${GCS}/Karim%20Head%20Of%20Administration.jpg` },
];

export function FoundersSection() {
  return (
    <section className="founders" id="founders">
      <div className="wrap">
        <div className="founders__head">
          <span className="eyebrow up">Leadership</span>
          <h2 className="split">Meet the founders</h2>
          <p className="up">
            The visionaries behind KYR&apos;s premium client service, investment guidance,
            and transaction execution.
          </p>
        </div>
        <div className="team">
          {team.map(m => (
            <figure key={m.name} className="member" data-cursor="true" data-cursor-label="View">
              <div className="member__ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.img}
                  alt={`${m.name}, ${m.role}`}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                />
              </div>
              <figcaption>
                <h3>{m.name}</h3>
                <span>{m.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
