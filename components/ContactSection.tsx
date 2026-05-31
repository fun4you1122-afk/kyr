export default function ContactSection() {
  return (
    <section id="contact" className="section--dark contact-section">
      <div className="container">
        <div className="contact-layout">

          {/* ── Left: info ── */}
          <div className="contact-info">
            <span className="eyebrow">Get In Touch</span>
            <h2 className="section-title">
              Let&apos;s find your next property.
            </h2>
            <p className="contact-info__sub">
              Whether you&apos;re buying, investing, or need expert advice — our
              team responds within 24 hours.
            </p>

            <ul className="contact-details">
              <li>
                <span className="contact-details__icon" aria-hidden="true">📍</span>
                <span>Office 1402, Marina Plaza, Dubai Marina, UAE</span>
              </li>
              <li>
                <span className="contact-details__icon" aria-hidden="true">📞</span>
                <a href="tel:+97140000000">+971 4 000 0000</a>
              </li>
              <li>
                <span className="contact-details__icon" aria-hidden="true">✉</span>
                <a href="mailto:hello@kyr.ae">hello@kyr.ae</a>
              </li>
            </ul>
          </div>

          {/* ── Right: form ── */}
          <form className="contact-form" action="#" method="post" noValidate>
            <div className="contact-form__field">
              <label htmlFor="cf-name">Full Name</label>
              <input
                id="cf-name"
                type="text"
                name="name"
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="cf-email">Email Address</label>
              <input
                id="cf-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="cf-phone">
                Phone <span className="contact-form__optional">(optional)</span>
              </label>
              <input
                id="cf-phone"
                type="tel"
                name="phone"
                placeholder="+971 50 000 0000"
                autoComplete="tel"
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="cf-type">Enquiry Type</label>
              <select id="cf-type" name="enquiry_type" required>
                <option value="" disabled selected>Select an option</option>
                <option value="buying">Buying</option>
                <option value="selling">Selling</option>
                <option value="investment">Investment</option>
                <option value="golden-visa">Golden Visa</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="contact-form__field">
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                name="message"
                rows={5}
                placeholder="Tell us about what you're looking for..."
                required
              />
            </div>

            <button type="submit" className="btn-primary contact-form__submit">
              Send Enquiry
            </button>
          </form>

        </div>
      </div>

      <style>{`
        .contact-section {
          padding: 100px 0;
        }

        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        /* ── Info column ── */
        .contact-info__sub {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 20px;
          margin-bottom: 40px;
          max-width: 420px;
        }

        .contact-details {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-details li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        .contact-details__icon {
          font-size: 1rem;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .contact-details a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .contact-details a:hover {
          color: #A0724A;
        }

        /* ── Form column ── */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .contact-form__field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact-form__field label {
          font-family: 'Inter', sans-serif;
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
        }

        .contact-form__optional {
          font-size: 0.625rem;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.3);
          font-weight: 400;
          text-transform: none;
        }

        .contact-form input,
        .contact-form select,
        .contact-form textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 0;
          padding: 10px 0;
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 300;
          color: #ffffff;
          outline: none;
          transition: border-color 0.25s ease;
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
        }

        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: rgba(255, 255, 255, 0.22);
        }

        .contact-form select {
          color: rgba(255, 255, 255, 0.22);
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 4px center;
          padding-right: 24px;
        }

        .contact-form select option {
          background: #111110;
          color: #ffffff;
        }

        .contact-form input:focus,
        .contact-form select:focus,
        .contact-form textarea:focus {
          border-bottom-color: #A0724A;
        }

        .contact-form textarea {
          resize: vertical;
          min-height: 100px;
        }

        .contact-form__submit {
          margin-top: 8px;
          align-self: flex-start;
        }

        @media (max-width: 860px) {
          .contact-layout {
            grid-template-columns: 1fr;
            gap: 56px;
          }

          .contact-info__sub {
            max-width: 100%;
          }
        }

        @media (max-width: 580px) {
          .contact-section {
            padding: 72px 0;
          }
        }
      `}</style>
    </section>
  );
}
