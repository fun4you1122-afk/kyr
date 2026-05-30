'use client';
export function AboutSection() {
  return (
    <section className="manifesto wrap" id="about">
      <span className="eyebrow up">Who is KYR</span>
      <h2
        className="manifesto__big"
        id="manifestoBig"
        aria-label="Precision. Transparency. Market intelligence."
      >
        <span className="w">Precision.</span>{' '}
        <span className="w grad">Transparency.</span>{' '}
        <span className="w">Market</span>{' '}
        <span className="w grad">intelligence.</span>
      </h2>
      <div className="manifesto__foot">
        <p className="manifesto__lead up">
          KYR is a UAE-based real estate company specializing in premium properties and high-profile
          clientele. We provide strategic guidance backed by real market knowledge — not assumptions.
          Every decision is informed; every transaction handled with confidence.
        </p>
        <div className="manifesto__meta up">
          <div><b>Off-Plan</b><span>Early-entry pricing</span></div>
          <div><b>High ROI</b><span>Data-driven strategy</span></div>
          <div><b>Discretion</b><span>Elite clientele</span></div>
        </div>
      </div>
    </section>
  );
}
