const navLinks = [
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function FooterSection() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          {/* Wordmark / logo */}
          <div className="footer-brand">
            <span className="footer-wordmark">KYR</span>
            <p className="footer-tagline">Dubai&apos;s trusted real estate partner.</p>
          </div>

          {/* Navigation */}
          <nav className="footer-nav" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="footer-nav__link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© 2025 KYR Real Estate. All rights reserved.</span>
          <span className="footer-bottom__dot" aria-hidden="true">·</span>
          <span>RERA Licensed</span>
        </div>
      </div>

      <style>{`
        .footer-section {
          background-color: #111110;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 56px 0 40px;
        }

        .footer-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-wordmark {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: #ffffff;
          line-height: 1;
        }

        .footer-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 300;
        }

        .footer-nav {
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
        }

        .footer-nav__link {
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-nav__link:hover {
          color: #A0724A;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.28);
          flex-wrap: wrap;
        }

        .footer-bottom__dot {
          opacity: 0.4;
        }

        @media (max-width: 600px) {
          .footer-top {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 32px;
          }

          .footer-nav {
            gap: 20px;
          }

          .footer-section {
            padding: 48px 0 32px;
          }
        }
      `}</style>
    </footer>
  );
}
