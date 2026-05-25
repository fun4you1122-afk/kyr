'use client';
import { motion } from 'framer-motion';
import SocialIcons from '@/components/SocialIcons';

const quickLinks = [
  { label: 'Home',       id: 'home' },
  { label: 'About Us',   id: 'about' },
  { label: 'Properties', id: 'properties' },
  { label: 'Services',   id: 'services' },
  { label: 'Invest',     id: 'invest' },
  { label: 'Contact',    id: 'contact' },
];

const premiumServices = [
  'Off-Plan Projects',
  'Golden Visa Advisory',
  'Property Management',
  'Market Intelligence Reports',
  'Investment Consultation',
  'Portfolio Management',
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060609] border-t border-[rgba(196,165,90,0.1)] overflow-hidden">

      {/* Top decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.3)] to-transparent" />

      {/* Large KYR text in background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="font-serif text-[30vw] font-light text-white/[0.012] leading-none">KYR</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="https://i.ibb.co/F4J4BkrX/Untitled-design-3.png"
              alt="KYR Real Estate"
              className="h-12 w-auto mb-6"
              style={{ filter: 'drop-shadow(0 0 12px rgba(196,165,90,0.2))' }}
            />
            <p className="text-white/35 text-sm font-light leading-relaxed max-w-xs mb-8">
              Dubai&apos;s premier luxury property agency. Redefining real estate through transparency, expertise, and precision.
            </p>
            {/* Contact */}
            <div className="flex flex-col gap-3">
              <a href="tel:+971585820297" className="text-sm text-white/40 hover:text-[#c4a55a] transition-colors flex items-center gap-2">
                <span className="text-[#c4a55a] text-xs">◆</span> +971 58 582 0297
              </a>
              <a href="mailto:info@kyr.ae" className="text-sm text-white/40 hover:text-[#c4a55a] transition-colors flex items-center gap-2">
                <span className="text-[#c4a55a] text-xs">◆</span> info@kyr.ae
              </a>
              <a href="mailto:sales@kyr.ae" className="text-sm text-white/40 hover:text-[#c4a55a] transition-colors flex items-center gap-2">
                <span className="text-[#c4a55a] text-xs">◆</span> sales@kyr.ae
              </a>
              <span className="text-sm text-white/40 flex items-center gap-2">
                <span className="text-[#c4a55a] text-xs">◆</span> Dubai, United Arab Emirates
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#c4a55a] mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map(l => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-sm text-white/40 hover:text-white/70 transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-[#c4a55a] group-hover:w-4 transition-all duration-300" />
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Premium services */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#c4a55a] mb-6">Premium Services</h4>
            <div className="flex flex-col gap-3">
              {premiumServices.map(s => (
                <span key={s} className="text-sm text-white/40 flex items-center gap-2 group cursor-default hover:text-white/60 transition-colors">
                  <span className="w-0 h-px bg-[#c4a55a] group-hover:w-4 transition-all duration-300" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass rounded-2xl p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ border: '1px solid rgba(196,165,90,0.1)' }}>
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-[#c4a55a] mb-1">Market Intelligence</div>
            <h3 className="font-serif text-xl text-white font-light">Subscribe to Our Property Updates</h3>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-64 bg-transparent border border-white/8 rounded-full px-5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[rgba(196,165,90,0.3)]"
            />
            <button className="px-6 py-2.5 rounded-full text-xs tracking-wider uppercase font-semibold text-black flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #c4a55a, #e8d5a3)' }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex justify-center mb-12">
          <SocialIcons />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; 2026 KYR Real Estate. All Rights Reserved. Dubai, UAE
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'RERA Licensed'].map(item => (
              <span key={item} className="text-xs text-white/20">{item}</span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-white/20">Online · Available Now</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
