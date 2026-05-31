'use client';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} role="navigation">
      <div className="container">
        <div className="nav__inner">
          <a href="#top" className="nav__logo" onClick={close}>KYR</a>

          <ul className="nav__links">
            <li><a href="#catalogue">Properties</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="nav__right">
            <a href="#contact" className="nav__cta-link btn-primary">Enquire Now</a>
            <button
              className={`nav__burger${open ? ' nav__burger--open' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(p => !p)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="nav__mobile">
          <a href="#catalogue" onClick={close}>Properties</a>
          <a href="#services" onClick={close}>Services</a>
          <a href="#about" onClick={close}>About</a>
          <a href="#contact" onClick={close}>Contact</a>
          <a href="#contact" className="btn-primary" style={{marginTop:'8px'}} onClick={close}>Enquire Now</a>
        </div>
      )}
    </nav>
  );
}
