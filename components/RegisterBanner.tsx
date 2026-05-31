export function RegisterBanner() {
  return (
    <section className="register-banner">
      <div className="register-banner__bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=70&fit=crop"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="register-banner__content">
        <span className="register-banner__eyebrow">Get Started</span>
        <h2 className="register-banner__title">
          Register Your Interest
        </h2>
        <p className="register-banner__sub">
          Get in touch with KYR to explore our curated listings and tailored investment
          opportunities. Our experts respond within 24 hours.
        </p>
        <div className="register-banner__actions">
          <a href="#contact" className="btn-primary">Register Now</a>
          <a href="tel:+97140000000" className="btn-ghost btn-ghost--dark">Call Us</a>
        </div>
      </div>
    </section>
  );
}
