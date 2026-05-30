'use client';
export function Navbar() {
  return (
    <>
      <header className="nav" id="nav">
        <a className="nav__brand" href="#top" data-cursor="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://www.kyr.ae/KYR%20LOGO%20WHITE.svg" alt="KYR Real Estate" />
        </a>
        <nav className="nav__links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#standard">Portfolio</a>
          <a href="#advantage">Opportunities</a>
          <a href="#invest">Invest</a>
        </nav>
        <a className="nav__cta magnetic" href="#contact" data-cursor="true">
          <span className="magnetic__inner">Book a Consultation</span>
        </a>
        <button className="burger" id="burger" aria-label="Open menu">
          <span /><span />
        </button>
      </header>

      <div className="mobile-menu" id="mobileMenu">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#standard">Portfolio</a>
        <a href="#advantage">Opportunities</a>
        <a href="#invest">Invest</a>
        <a href="#contact">Contact</a>
      </div>
    </>
  );
}
