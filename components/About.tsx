'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const pillars = [
  { title: 'Transparency', desc: 'We operate with complete clarity — no hidden fees, no surprises. Every transaction is guided by honesty and integrity.' },
  { title: 'Expertise', desc: 'Our team combines decades of Dubai market experience with data-driven insights to give you a clear edge.' },
  { title: 'Precision', desc: 'From property selection to closing, every detail is handled with meticulous attention to ensure perfect outcomes.' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="about" className="relative section-padding overflow-hidden" ref={ref}>
      <div className="absolute inset-0 gradient-mesh" />

      {/* Decorative lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(196,165,90,0.2)] to-transparent ml-8 hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left: Image cluster with parallax */}
          <div className="relative h-[600px]">
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 w-3/4 h-4/5 rounded-2xl overflow-hidden"
              style={{ y: y1, boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
            >
              <div className="w-full h-full relative">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
                  alt="Dubai luxury property"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[rgba(8,8,16,0.4)]" />
              </div>
            </motion.div>

            {/* Secondary image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden"
              style={{ y: y2, boxShadow: '0 30px 60px rgba(0,0,0,0.7)', border: '1px solid rgba(196,165,90,0.15)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"
                alt="Dubai skyline"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-[rgba(8,8,16,0.3)]" />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-strong rounded-2xl p-6 z-10 floating"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}
            >
              <div className="text-center">
                <div className="font-serif text-4xl text-gold-gradient font-light">8+</div>
                <div className="text-[9px] tracking-[0.25em] uppercase text-white/40 mt-1">Years in Dubai</div>
              </div>
            </motion.div>

            {/* Gold accent border */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#c4a55a]/20 rounded-2xl" />
            <div className="absolute -top-4 -left-4 w-20 h-20 border border-[#c4a55a]/10 rounded-xl" />
          </div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="premium-badge mb-6">Our Story</div>
              <h2 className="font-serif font-light text-white leading-tight mb-6"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                A New Standard<br />
                <span className="text-gold-gradient">in Dubai Real Estate</span>
              </h2>
              <div className="gold-line mb-8" />
              <p className="text-white/50 leading-relaxed font-light mb-6 text-sm">
                KYR Real Estate was founded with a singular vision: to redefine what a luxury property agency means in the world&apos;s most ambitious city. We are a UAE-based real estate company specialising in premium properties and high-profile clientele.
              </p>
              <p className="text-white/50 leading-relaxed font-light mb-10 text-sm">
                Our approach combines transparency, data-driven insight, and a clear understanding of market movements — delivering not just properties, but life-defining experiences in one of the globe&apos;s most dynamic real estate markets.
              </p>
            </motion.div>

            {/* Pillars */}
            <div className="flex flex-col gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-px bg-gradient-to-b from-[#c4a55a] to-transparent mt-1 h-full" />
                  <div className="pl-4 pb-4 border-b border-white/5">
                    <h3 className="text-[#c4a55a] text-sm font-medium tracking-wider uppercase mb-1">{p.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed font-light">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/5"
            >
              <a href="tel:+971585820297" className="flex items-center gap-2 text-xs text-white/40 hover:text-[#c4a55a] transition-colors">
                <div className="w-px h-4 bg-[#c4a55a]/40" />
                +971 58 582 0297
              </a>
              <a href="mailto:info@kyr.ae" className="flex items-center gap-2 text-xs text-white/40 hover:text-[#c4a55a] transition-colors">
                <div className="w-px h-4 bg-[#c4a55a]/40" />
                info@kyr.ae
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
