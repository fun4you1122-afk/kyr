'use client';
export function ContactSection() {
  return (
    <section className="contact wrap" id="contact">
      <span className="eyebrow up" style={{ justifyContent: 'center' }}>Begin the conversation</span>
      <h2 className="contact__title">
        <span className="line"><span className="line-i">Let&apos;s unlock your</span></span>
        <span className="line"><span className="line-i"><em>position</em> in Dubai.</span></span>
      </h2>
      <p className="contact__sub up">
        Book a private consultation and gain access to opportunities before they reach the open market.
      </p>
      <div className="contact__actions up">
        <a className="btn btn--gold magnetic" href="https://wa.me/971585820297" target="_blank" rel="noopener" data-cursor="true">
          <span className="magnetic__inner">WhatsApp Us <i className="arr">→</i></span>
        </a>
        <a className="btn btn--ghost magnetic" href="mailto:sales@kyr.ae" data-cursor="true">
          <span className="magnetic__inner">Email Sales</span>
        </a>
      </div>
      <div className="contact__info">
        <div className="up"><span>Call</span><a href="tel:+971585820297">+971 58 582 0297</a></div>
        <div className="up"><span>Email</span><a href="mailto:info@kyr.ae">info@kyr.ae</a></div>
        <div className="up"><span>Sales</span><a href="mailto:sales@kyr.ae">sales@kyr.ae</a></div>
        <div className="up"><span>Office</span><a href="#">UAE, Dubai</a></div>
      </div>
    </section>
  );
}
