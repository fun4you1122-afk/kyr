'use client';
export function MarqueeBand() {
  const text = (
    <span>
      DLD Regulated <i>✦</i> Golden Visa Ready <i>✦</i> 0% Property Tax <i>✦</i>{' '}
      8–10% Rental Yields <i>✦</i> Off-Plan Access <i>✦</i> High ROI <i>✦</i>{' '}
    </span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {text}{text}
      </div>
    </div>
  );
}
