'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const packages = [
  {
    title: 'Off-Plan Excellence',
    icon: '🏗️',
    price: 'From AED 800K',
    roi: 'Up to 15% ROI',
    highlight: false,
    features: [
      'Pre-launch access to top developers',
      'Emaar, Meraas, Nakheel projects',
      'Flexible payment plans (10/90)',
      'Market analysis & price tracking',
      'Priority selection on prime units',
    ],
    cta: 'Explore Projects',
  },
  {
    title: 'Golden Visa Package',
    icon: '⭐',
    price: 'From AED 2M',
    roi: '10-Year Residency',
    highlight: true,
    features: [
      '10-year renewable UAE residency',
      'Full family sponsorship included',
      'No local sponsor required',
      'Business & travel freedom',
      'Property investment guidance',
    ],
    cta: 'Apply Now',
  },
  {
    title: 'Portfolio Management',
    icon: '📈',
    price: 'Custom',
    roi: 'Managed Returns',
    highlight: false,
    features: [
      'Full property management service',
      'Tenant screening & placement',
      'Rental income optimization',
      'Maintenance coordination',
      'Monthly performance reports',
    ],
    cta: 'Get Started',
  },
];

export default function Investment() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative section-padding overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[#080810]" />
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.15)] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <div className="premium-badge mb-6 inline-block">Investment Solutions</div>
          <h2 className="font-serif font-light text-white" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Tailored for Your<br /><span className="text-gold-gradient">Ambitions</span>
          </h2>
          <div className="flex justify-center mt-6">
            <div className="gold-line" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-3xl p-8 flex flex-col gap-6 overflow-hidden ${
                pkg.highlight
                  ? 'border border-[#c4a55a]/40 bg-gradient-to-b from-[rgba(196,165,90,0.08)] to-transparent'
                  : 'luxury-card'
              }`}
              style={pkg.highlight ? { boxShadow: '0 0 60px rgba(196,165,90,0.1), 0 40px 80px rgba(0,0,0,0.4)' } : {}}
            >
              {/* Highlight badge */}
              {pkg.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5 rounded-full text-[9px] tracking-[0.2em] uppercase font-semibold text-black"
                  style={{ background: 'linear-gradient(90deg, #c4a55a, #e8d5a3)' }}>
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className="text-4xl">{pkg.icon}</div>

              {/* Title & Price */}
              <div>
                <h3 className="font-serif text-2xl text-white font-light mb-1">{pkg.title}</h3>
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/30">{pkg.price}</div>
              </div>

              {/* ROI badge */}
              <div className="inline-flex self-start px-4 py-1.5 rounded-full bg-[rgba(196,165,90,0.1)] border border-[rgba(196,165,90,0.2)]">
                <span className="text-xs text-[#c4a55a] font-medium">{pkg.roi}</span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-[rgba(196,165,90,0.2)] to-transparent" />

              {/* Features */}
              <div className="flex flex-col gap-3 flex-1">
                {pkg.features.map(f => (
                  <div key={f} className="flex items-start gap-3">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-[rgba(196,165,90,0.15)] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#c4a55a] text-[10px]">✓</span>
                    </div>
                    <span className="text-xs text-white/50 font-light leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-3 text-xs tracking-[0.15em] uppercase font-medium rounded-full transition-all duration-300 ${
                  pkg.highlight
                    ? 'bg-[#c4a55a] text-black hover:bg-[#e8d5a3]'
                    : 'border border-[#c4a55a]/30 text-[#c4a55a] hover:bg-[#c4a55a]/10'
                }`}
              >
                {pkg.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Market report teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-3 text-center"
        >
          <span className="text-white/25 text-xs">Need market intelligence?</span>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[#c4a55a] text-xs underline underline-offset-2 hover:no-underline transition-all"
          >
            Request our free Dubai Market Report 2026
          </button>
        </motion.div>
      </div>
    </section>
  );
}
