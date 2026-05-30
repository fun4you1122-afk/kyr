'use client';
export function Loader() {
  return (
    <div className="loader" id="loader">
      <div className="loader__row">
        <div className="loader__mono">KYR</div>
        <div className="loader__count"><span id="loaderNum">0</span><i>%</i></div>
      </div>
      <div className="loader__bar"><span id="loaderBar" /></div>
      <div className="loader__tag">Dubai · Luxury Real Estate</div>
    </div>
  );
}
