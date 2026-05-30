'use client';
const GCS = 'https://storage.googleapis.com/kyrwebsite-frontend-620364934597/KYR%20Banners';

export function InvestSection() {
  return (
    <section className="invest panel" id="invest">
      <div className="wrap">
        <div className="visa">
          <div className="visa__pic">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1582407947304-fd86f28f0046?w=900&q=90&fit=crop"
              alt="Dubai luxury real estate — Golden Visa investment"
            />
          </div>
          <div className="visa__body">
            <span className="eyebrow up">Residency Program</span>
            <h2 className="up">The UAE <em>Golden Visa</em></h2>
            <p className="up">
              Secure a 10-year renewable residency by investing in Dubai real estate — granting you and
              your family long-term stability, business advantages, and premium healthcare access.
            </p>
            <ul className="ticklist">
              <li className="up"><span className="x">✦</span>Minimum investment: AED 2,000,000</li>
              <li className="up"><span className="x">✦</span>Covers spouse, children &amp; domestic staff</li>
              <li className="up"><span className="x">✦</span>No minimum physical presence requirement</li>
              <li className="up"><span className="x">✦</span>KYR handles the entire PRO process</li>
            </ul>
            <a className="btn btn--gold magnetic up" href="#contact" data-cursor="true">
              <span className="magnetic__inner">Start Your Application <i className="arr">→</i></span>
            </a>
          </div>
        </div>

        <div className="tri">
          <div className="tcard up">
            <div className="tcard__ic">I.</div>
            <h3>Property Management</h3>
            <p>Hands-off, high-yield asset management — tenant screening, leasing, rent collection, and 24/7 maintenance.</p>
          </div>
          <div className="tcard up">
            <div className="tcard__ic">II.</div>
            <h3>DLD Market Reports</h3>
            <p>Exclusive data direct from the Dubai Land Department — transaction volumes, ROI trends, and district forecasts.</p>
          </div>
          <div className="tcard up">
            <div className="tcard__ic">III.</div>
            <h3>Portfolio Strategy</h3>
            <p>Custom-tailored investment strategies to maximize capital appreciation and yields for your risk profile.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
