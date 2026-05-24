'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { value: 500,  suffix: '+',  label: 'Properties Sold',      sublabel: 'Across premium Dubai locations' },
  { value: 2.5,  suffix: 'B+', label: 'AED Total Sales',      sublabel: 'In closed transactions' },
  { value: 98,   suffix: '%',  label: 'Client Satisfaction',  sublabel: 'Verified client reviews' },
  { value: 8,    suffix: '+',  label: 'Years Experience',      sublabel: 'In Dubai real estate market' },
  { value: 1500, suffix: '+',  label: 'Happy Clients',        sublabel: 'And growing every day' },
  { value: 50,   suffix: '+',  label: 'Expert Advisors',      sublabel: 'Multilingual & certified' },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* Full bleed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080810] via-[#0d0d1a] to-[#080810]" />

      {/* Large decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif text-[20vw] font-light text-white/[0.015] whitespace-nowrap">KYR</span>
      </div>

      {/* Horizontal gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.2)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.2)] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="premium-badge mb-4 inline-block">By the Numbers</div>
          <h2 className="font-serif font-light text-white" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Proven Track Record of <span className="text-gold-gradient">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
            >
              {/* Number */}
              <div className="relative mb-3">
                {isInView && (
                  <div className="stat-number text-5xl text-gold-gradient">
                    <CountUp
                      end={s.value}
                      duration={2.5}
                      delay={i * 0.15}
                      decimals={s.suffix === 'B+' ? 1 : 0}
                    />
                    <span>{s.suffix}</span>
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="text-xs font-medium text-white/70 tracking-wider uppercase mb-1">{s.label}</div>
              <div className="text-[10px] text-white/25 font-light">{s.sublabel}</div>

              {/* Underline */}
              <div className="mt-3 h-px w-8 bg-gradient-to-r from-transparent via-[#c4a55a] to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.3)] to-transparent origin-left"
        />
      </div>
    </section>
  );
}
