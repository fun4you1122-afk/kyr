'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const reasons = [
  { num: '01', title: '0% Income Tax', desc: 'One of the few jurisdictions globally with zero personal income tax on property investments.' },
  { num: '02', title: 'Global Hub', desc: 'Dubai connects East and West — a city of 200+ nationalities and the world\'s busiest international airport.' },
  { num: '03', title: '8-12% Rental Yield', desc: 'Dubai delivers among the highest rental yields globally, outperforming London, New York, and Paris.' },
  { num: '04', title: 'Golden Visa Access', desc: 'Invest AED 2M+ in real estate to secure your 10-year UAE residency for the entire family.' },
  { num: '05', title: 'World-Class Living', desc: 'Unparalleled lifestyle — from Michelin-starred restaurants to private beach clubs and championship golf.' },
  { num: '06', title: 'Regulated Market', desc: 'RERA-regulated transactions with full legal protection and complete foreign ownership rights.' },
];

export default function DubaiSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="invest" className="relative section-padding overflow-hidden" ref={ref}>
      {/* Background image with parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-[-60px] z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80"
          alt="Dubai skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,16,0.92)] via-[rgba(8,8,16,0.85)] to-[rgba(8,8,16,0.95)]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <div className="premium-badge mb-6 inline-block">Why Dubai</div>
          <h2 className="font-serif font-light text-white leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            The World&apos;s Most<br />
            <span className="text-gold-gradient">Dynamic Real Estate Market</span>
          </h2>
          <div className="flex justify-center mt-6 mb-8">
            <div className="gold-line" />
          </div>
          <p className="text-white/40 max-w-xl mx-auto text-sm font-light leading-relaxed">
            Dubai continues to redefine what&apos;s possible — a city that never stops growing, innovating, and attracting the world&apos;s most ambitious people and capital.
          </p>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(196,165,90,0.08)] rounded-3xl overflow-hidden">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[rgba(8,8,16,0.9)] p-10 group hover:bg-[rgba(196,165,90,0.04)] transition-all duration-500 cursor-default"
            >
              <div className="flex items-start gap-6">
                <div className="font-serif text-5xl text-[rgba(196,165,90,0.15)] font-light leading-none group-hover:text-[rgba(196,165,90,0.3)] transition-colors duration-500 flex-shrink-0">
                  {r.num}
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm tracking-wider mb-3 group-hover:text-[#c4a55a] transition-colors duration-300">
                    {r.title}
                  </h3>
                  <p className="text-white/35 text-xs leading-relaxed font-light">{r.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-16 glass-strong rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ boxShadow: '0 0 60px rgba(196,165,90,0.05)' }}
        >
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#c4a55a] mb-3">Investment Insight</div>
            <h3 className="font-serif text-2xl text-white font-light">
              Ready to invest in Dubai?<br />
              <span className="text-gold-gradient">Let&apos;s find your perfect opportunity.</span>
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(196,165,90,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 text-xs tracking-[0.15em] uppercase font-semibold text-black rounded-full"
              style={{ background: 'linear-gradient(135deg, #c4a55a, #e8d5a3)' }}
            >
              Start Investing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 text-xs tracking-[0.15em] uppercase text-[#c4a55a] border border-[#c4a55a]/30 rounded-full hover:bg-[#c4a55a]/10 transition-all duration-300"
            >
              Request Guide
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
