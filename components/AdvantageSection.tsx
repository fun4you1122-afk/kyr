'use client';
const districts = 'Downtown Dubai · Dubai Marina · Palm Jumeirah · Business Bay · Jumeirah Village · ';

export function AdvantageSection() {
  return (
    <section className="advantage panel" id="advantage">
      <div className="wrap">
        <div className="advantage__head">
          <span className="eyebrow up">The Dubai Advantage</span>
          <h2 className="split">Where capital compounds.</h2>
        </div>
        <div className="stats">
          <div className="stat up">
            <div className="stat__v">0<small>%</small></div>
            <div className="stat__k">Property Tax</div>
            <div className="stat__d">Tax-free residential &amp; commercial returns.</div>
          </div>
          <div className="stat up">
            <div className="stat__v"><span className="count" data-to="10">0</span><small>%</small></div>
            <div className="stat__k">Rental Yields</div>
            <div className="stat__d">Up to 8–10% consistently, annually.</div>
          </div>
          <div className="stat up">
            <div className="stat__v"><small>AED </small><span className="count" data-to="2">0</span><small>M</small></div>
            <div className="stat__k">Golden Visa</div>
            <div className="stat__d">10-year residency eligibility.</div>
          </div>
          <div className="stat up">
            <div className="stat__v"><span className="count" data-to="100">0</span><small>%</small></div>
            <div className="stat__k">Secure &amp; Regulated</div>
            <div className="stat__d">DLD-regulated escrow protection.</div>
          </div>
        </div>
      </div>
      <div className="marquee marquee--rev" aria-hidden="true">
        <div className="marquee__track">
          <span>{districts}</span>
          <span>{districts}</span>
        </div>
      </div>
    </section>
  );
}
