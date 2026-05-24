'use client';
import { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import KineticText from './KineticText';

const pillars = [
  { title: 'Transparency', desc: 'Complete clarity on every transaction — no hidden fees, no surprises. Every deal is guided by honesty and integrity.' },
  { title: 'Expertise',    desc: 'Decades of Dubai market experience combined with data-driven insight gives you a clear, decisive edge.' },
  { title: 'Precision',   desc: 'From property selection to closing, every detail is handled with meticulous attention to ensure perfect outcomes.' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // GSAP line draw on the gold pillar lines
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const init = async () => {
      const { default: gsap }  = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          '.pillar-line',
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: { trigger: '.pillars-wrap', start: 'top 80%' },
          }
        );
        gsap.fromTo(
          '.pillar-item',
          { x: 40, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.15,
            scrollTrigger: { trigger: '.pillars-wrap', start: 'top 80%' },
          }
        );
      }, ref);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="about" className="relative section-padding overflow-hidden" ref={ref}>
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(196,165,90,0.15)] to-transparent hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Left: image cluster ─────────────────────────────── */}
          <div className="relative h-[620px]">
            {/* Main image */}
            <motion.div
              style={{ y: y1, boxShadow: '0 40px 80px rgba(0,0,0,0.65)' }}
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.16,1,0.3,1] }}
              className="absolute top-0 left-0 w-3/4 h-4/5 rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
                alt="Dubai luxury property"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[rgba(8,8,16,0.45)]" />
            </motion.div>

            {/* Secondary image */}
            <motion.div
              style={{ y: y2, boxShadow: '0 30px 60px rgba(0,0,0,0.7)', border: '1px solid rgba(196,165,90,0.15)' }}
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16,1,0.3,1] }}
              className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"
                alt="Dubai skyline"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-[rgba(8,8,16,0.3)]" />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.9, ease: [0.16,1,0.3,1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-strong rounded-2xl p-6 z-10 floating"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(196,165,90,0.08)' }}
            >
              <div className="text-center">
                <div className="font-serif text-5xl text-gold-gradient font-light">8+</div>
                <div className="text-[9px] tracking-[0.25em] uppercase text-white/40 mt-1">Years in Dubai</div>
              </div>
            </motion.div>

            {/* Corner accents */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[rgba(196,165,90,0.15)] rounded-2xl pointer-events-none" />
            <div className="absolute -top-4 -left-4 w-20 h-20 border border-[rgba(196,165,90,0.08)] rounded-xl pointer-events-none" />
          </div>

          {/* ── Right: content ──────────────────────────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9 }}
            >
              <div className="premium-badge mb-6">Our Story</div>
              <h2 className="font-serif font-light text-white leading-tight mb-2"
                style={{ fontSize: 'clamp(2.2rem,3.5vw,3.2rem)' }}>
                <KineticText
                  text="A New Standard in Dubai Real Estate"
                  tag="span"
                  delay={0.1}
                  stagger={0.04}
                />
              </h2>
              <div className="text-gold-gradient font-serif font-light mb-6"
                style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)' }}>
                Built on Integrity.
              </div>
              <div className="gold-line mb-8" />
              <p className="text-white/45 leading-relaxed font-light mb-5 text-sm">
                KYR Real Estate was founded with a singular vision: to redefine what a luxury property agency means in the world&apos;s most ambitious city. We are a UAE-based firm specialising in premium properties and high-profile clientele.
              </p>
              <p className="text-white/45 leading-relaxed font-light mb-10 text-sm">
                Our approach combines transparency, data-driven insight, and a deep understanding of market movements — delivering not just properties, but life-defining experiences.
              </p>
            </motion.div>

            {/* Pillars */}
            <div className="pillars-wrap flex flex-col gap-5">
              {pillars.map((p, i) => (
                <div key={p.title} className="pillar-item flex gap-4 opacity-0">
                  <div className="pillar-line flex-shrink-0 w-px bg-gradient-to-b from-[#c4a55a] to-transparent mt-1" style={{ minHeight: '60px' }} />
                  <div className="pl-4 pb-4 border-b border-white/5 flex-1">
                    <h3 className="text-[#c4a55a] text-xs font-semibold tracking-[0.2em] uppercase mb-1">{p.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed font-light">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 mt-10 pt-8 border-t border-white/5"
            >
              {[
                { href: 'tel:+971585820297', label: '+971 58 582 0297' },
                { href: 'mailto:info@kyr.ae', label: 'info@kyr.ae' },
              ].map(c => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  whileHover={{ x: 4, color: '#c4a55a' }}
                  className="flex items-center gap-2 text-xs text-white/35 transition-colors duration-300"
                >
                  <span className="w-px h-4 bg-[rgba(196,165,90,0.4)]" />
                  {c.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
