'use client';
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { value: 500,  suffix: '+',  label: 'Properties Sold',     sublabel: 'Across premium locations' },
  { value: 2.5,  suffix: 'B+', label: 'AED Total Sales',     sublabel: 'In closed transactions' },
  { value: 98,   suffix: '%',  label: 'Client Satisfaction', sublabel: 'Verified client reviews' },
  { value: 8,    suffix: '+',  label: 'Years Experience',    sublabel: 'In Dubai real estate' },
  { value: 1500, suffix: '+',  label: 'Happy Clients',       sublabel: 'And growing every day' },
  { value: 50,   suffix: '+',  label: 'Expert Advisors',     sublabel: 'Multilingual & certified' },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // GSAP: counter bars animate width
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const init = async () => {
      const { default: gsap }  = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          '.stat-bar',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: 'top 80%' },
          }
        );
        gsap.fromTo(
          '.stat-card',
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: 'top 80%' },
          }
        );
      }, ref);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#080810] via-[#0c0c18] to-[#080810]" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="font-serif text-[22vw] font-light text-white/[0.012] whitespace-nowrap leading-none">KYR</span>
      </div>

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.2)] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.2)] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="premium-badge mb-4 inline-block">By the Numbers</div>
          <h2 className="font-serif font-light text-white" style={{ fontSize: 'clamp(2rem,3.5vw,3rem)' }}>
            Proven Track Record of <span className="text-gold-gradient">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className="stat-card opacity-0 text-center group">
              {/* Number */}
              <div className="mb-3">
                {isInView && (
                  <div className="font-serif text-5xl text-gold-gradient font-light leading-none">
                    <CountUp
                      end={s.value}
                      duration={2.8}
                      delay={i * 0.12}
                      decimals={s.suffix === 'B+' ? 1 : 0}
                    />
                    <span>{s.suffix}</span>
                  </div>
                )}
              </div>
              <div className="text-xs font-medium text-white/65 tracking-wider uppercase mb-1">{s.label}</div>
              <div className="text-[10px] text-white/22 font-light">{s.sublabel}</div>

              {/* Animated bar */}
              <div className="mt-4 h-px bg-white/5 overflow-hidden rounded-full">
                <div className="stat-bar h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #c4a55a, #e8d5a3)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
