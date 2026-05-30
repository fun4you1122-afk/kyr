'use client';
export function FooterSection() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.kyr.ae/KYR%20LOGO%20WHITE.svg" alt="KYR Real Estate" />
            <p>
              Redefining real estate through transparency, expertise, and precision. Your trusted
              partner for off-plan and high-ROI properties in Dubai.
            </p>
            <div className="socials">
              <a href="https://www.instagram.com/kyrrealestate/" target="_blank" rel="noopener" data-cursor="true">Instagram</a>
              <a href="https://wa.me/971585820297" target="_blank" rel="noopener" data-cursor="true">WhatsApp</a>
              <a href="https://www.tiktok.com/@kyr_realestate" target="_blank" rel="noopener" data-cursor="true">TikTok</a>
            </div>
          </div>

          <div className="footer__col">
            <h4>Quick Links</h4>
            <a href="#top">Home</a>
            <a href="#about">About Us</a>
            <a href="#advantage">Opportunities</a>
            <a href="#invest">Invest</a>
            <a href="#contact">Contact Us</a>
          </div>

          <div className="footer__col">
            <h4>Premium Services</h4>
            <a href="#standard">Off-Plan Projects</a>
            <a href="#invest">Golden Visa</a>
            <a href="#invest">Property Management</a>
            <a href="#invest">Market Reports</a>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <a href="tel:+971585820297">+971 58 582 0297</a>
            <a href="mailto:info@kyr.ae">info@kyr.ae</a>
            <a href="mailto:sales@kyr.ae">sales@kyr.ae</a>
            <a href="#">UAE, Dubai</a>
          </div>
        </div>

        <div className="footer__word">KYR</div>

        <div className="footer__bottom">
          <span>© 2026 KYR Real Estate. All Rights Reserved.</span>
          <span>Designed for Excellence.</span>
        </div>
      </div>
    </footer>
  );
}
