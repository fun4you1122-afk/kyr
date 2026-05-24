'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    icon: '🏠',
    number: '01',
    title: 'Buy Property',
    subtitle: 'Off-Plan & Ready',
    desc: "Discover an exclusive portfolio of off-plan and ready properties across Dubai's most iconic developments — from Emaar masterplans to boutique luxury residences.",
    features: ['Exclusive off-plan access', 'Market valuation reports', 'Legal & documentation support', 'ROI analysis'],
    color: 'from-[rgba(196,165,90,0.1)]',
  },
  {
    icon: '🔑',
    number: '02',
    title: 'Rent a Property',
    subtitle: 'Flexible Luxury',
    desc: 'Access the finest luxury apartments and villas with flexible terms, designed for those who demand the best — without compromising on convenience.',
    features: ['Short & long-term options', 'Fully furnished residences', 'Premium location focus', 'Concierge-level service'],
    color: 'from-[rgba(232,213,163,0.06)]',
  },
  {
    icon: '📊',
    number: '03',
    title: 'Consultation',
    subtitle: 'Expert Guidance',
    desc: 'Leverage our deep market intelligence for informed decisions. We provide expert market analysis, property valuation, and strategic investment guidance.',
    features: ['Market intelligence reports', 'Property valuation', 'Investment strategy', 'Portfolio review'],
    color: 'from-[rgba(196,165,90,0.08)]',
  },
  {
    icon: '🌟',
    number: '04',
    title: 'Golden Visa',
    subtitle: 'UAE Residency',
    desc: 'Secure your UAE Golden Visa through strategic property investment. Our advisors guide you through every step of the residency-by-investment journey.',
    features: ['AED 2M+ threshold guidance', 'Application support', 'Family inclusion advice', 'Renewal assistance'],
    color: 'from-[rgba(232,213,163,0.07)]',
  },
];

function ServiceCard({ s, index, isInView }: { s: typeof services[0]; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 12;
    setTilt({ x: -y, y: x });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMove}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
      className="luxury-card rounded-3xl p-8 flex flex-col gap-6 cursor-pointer group relative overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${s.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

      {/* Number */}
      <div className="absolute top-6 right-8 font-serif text-6xl text-white/5 font-light select-none group-hover:text-[rgba(196,165,90,0.06)] transition-colors duration-500">
        {s.number}
      </div>

      {/* Icon */}
      <div className="relative text-3xl">{s.icon}</div>

      {/* Title */}
      <div className="relative">
        <div className="text-[10px] tracking-[0.25em] uppercase text-[#c4a55a] mb-1 font-light">{s.subtitle}</div>
        <h3 className="font-serif text-2xl text-white font-light">{s.title}</h3>
      </div>

      {/* Desc */}
      <p className="relative text-white/40 text-sm leading-relaxed font-light">{s.desc}</p>

      {/* Features */}
      <div className="relative flex flex-col gap-2">
        {s.features.map(f => (
          <div key={f} className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#c4a55a]" />
            <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors duration-300">{f}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative flex items-center gap-2 text-xs text-[#c4a55a] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
        <span className="tracking-[0.15em] uppercase">Learn More</span>
        <motion.span animate={hovered ? { x: 4 } : { x: 0 }} className="text-base">→</motion.span>
      </div>

      {/* Glow border */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: 'inset 0 0 30px rgba(196,165,90,0.04)' }} />
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="relative section-padding overflow-hidden" ref={ref}>
      <div className="absolute inset-0 gradient-mesh" />

      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.2)] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <div className="premium-badge mb-6 inline-block">What We Offer</div>
          <h2 className="font-serif font-light text-white leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Premium Services,<br />
            <span className="text-gold-gradient">Unmatched Results</span>
          </h2>
          <div className="flex justify-center mt-6">
            <div className="gold-line" />
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Bottom marquee */}
        <div className="mt-20 overflow-hidden border-t border-white/5 pt-10">
          <div className="marquee-track flex whitespace-nowrap gap-12">
            {['Off-Plan Projects', 'Golden Visa', 'Property Management', 'Market Reports', 'Luxury Villas', 'Penthouses', 'Investment Advisory', 'Portfolio Management',
              'Off-Plan Projects', 'Golden Visa', 'Property Management', 'Market Reports', 'Luxury Villas', 'Penthouses', 'Investment Advisory', 'Portfolio Management']
              .map((item, i) => (
                <span key={i} className="text-xs tracking-[0.3em] uppercase text-white/15 flex items-center gap-12">
                  {item}
                  <span className="text-[#c4a55a] text-base">◆</span>
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
