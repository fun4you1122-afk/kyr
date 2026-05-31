interface Founder {
  name: string;
  title: string;
  bio: string;
  photo: string;
}

const founders: Founder[] = [
  {
    name: "Khalid Al Rashidi",
    title: "Founder & CEO",
    bio: "15 years navigating Dubai's property market. Khalid brings deep market intelligence and a network spanning every major developer in the UAE.",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85&fit=crop&crop=faces",
  },
  {
    name: "Yusuf Rahman",
    title: "Head of Investments",
    bio: "A specialist in off-plan acquisitions and ROI structuring, Yusuf has guided over 200 investors to high-yield portfolios across Dubai's growth corridors.",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85&fit=crop&crop=faces",
  },
  {
    name: "Sara Mubarak",
    title: "Client Relations Director",
    bio: "Sara ensures every client receives white-glove service from first consultation to handover — and beyond.",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=85&fit=crop&crop=faces",
  },
];

export default function FoundersSection() {
  return (
    <section id="about" className="section--dark founders-section">
      <div className="container">
        <div className="founders-header">
          <span className="eyebrow">The Team</span>
          <h2 className="section-title">
            Experts who've closed over AED 2 billion in Dubai real estate.
          </h2>
        </div>

        <div className="team-grid">
          {founders.map((founder) => (
            <div key={founder.name} className="team-card">
              <div className="team-card__photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.title}`}
                  width={400}
                  height={480}
                />
              </div>
              <div className="team-card__body">
                <h3 className="team-card__name">{founder.name}</h3>
                <p className="team-card__role">{founder.title}</p>
                <p className="team-card__bio">{founder.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .founders-section {
          padding: 100px 0;
        }

        .founders-header {
          max-width: 680px;
          margin-bottom: 64px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .team-card {
          display: flex;
          flex-direction: column;
        }

        .team-card__photo {
          width: 100%;
          aspect-ratio: 5 / 6;
          overflow: hidden;
          background-color: #1a1917;
          margin-bottom: 24px;
        }

        .team-card__photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.5s ease;
        }

        .team-card:hover .team-card__photo img {
          transform: scale(1.04);
        }

        .team-card__name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .team-card__role {
          font-family: 'Inter', sans-serif;
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #A0724A;
          margin-bottom: 16px;
        }

        .team-card__bio {
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 900px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 580px) {
          .founders-section {
            padding: 72px 0;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
