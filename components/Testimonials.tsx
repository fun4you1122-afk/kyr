'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Ahmed Al-Rashidi',
    role: 'Entrepreneur & Investor',
    location: 'Dubai, UAE',
    rating: 5,
    text: 'KYR helped us acquire our dream villa on Palm Jumeirah with absolute precision. Their market knowledge is unparalleled — they found us a deal that no one else could. Truly a world-class agency.',
    property: 'Palm Jumeirah Villa — AED 24M',
    avatar: 'A',
  },
  {
    name: 'Sarah Johnson',
    role: 'Corporate Executive',
    location: 'London / Dubai',
    rating: 5,
    text: 'As an international buyer, I was nervous about navigating the Dubai market. The KYR team made the entire process seamless, from property selection to Golden Visa application. Exceptional service.',
    property: 'Downtown Penthouse — AED 11M',
    avatar: 'S',
  },
  {
    name: 'Michael Chen',
    role: 'Tech Founder',
    location: 'Singapore',
    rating: 5,
    text: 'I\'ve worked with agencies across Asia and Europe. KYR stands out for their transparency and data-driven approach. My portfolio of 3 units is now delivering 11% annual rental yield. Outstanding.',
    property: 'Portfolio — 3 Units, Business Bay',
    avatar: 'M',
  },
  {
    name: 'Layla Al-Mansouri',
    role: 'Fashion Designer',
    location: 'Abu Dhabi, UAE',
    rating: 5,
    text: 'From the first consultation to handing over the keys, KYR exceeded every expectation. They understood my lifestyle needs and found a property that truly reflects who I am. Phenomenal team.',
    property: 'Jumeirah Beach Residence — AED 6.8M',
    avatar: 'L',
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const go = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const t = testimonials[current];

  return (
    <section className="relative section-padding overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] to-[#080810]" />

      {/* Large quote mark */}
      <div className="absolute top-10 left-10 font-serif text-[20rem] text-white/[0.01] leading-none select-none pointer-events-none">&ldquo;</div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.15)] to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <div className="premium-badge mb-6 inline-block">Client Stories</div>
          <h2 className="font-serif font-light text-white" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            What Our Clients <span className="text-gold-gradient">Say</span>
          </h2>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(196,165,90,0.04)' }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(196,165,90,0.06), transparent)' }} />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-[#c4a55a] text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-xl md:text-2xl text-white/85 font-light leading-relaxed mb-10 italic">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-black font-semibold text-lg"
                    style={{ background: 'linear-gradient(135deg, #c4a55a, #e8d5a3)' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.role} · {t.location}</div>
                  </div>
                </div>

                {/* Property */}
                <div className="premium-badge text-[9px]">
                  {t.property}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-1.5 bg-[#c4a55a]'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => go((current - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#c4a55a]/40 hover:text-[#c4a55a] transition-all duration-300"
          >
            ←
          </button>
          <button
            onClick={() => go((current + 1) % testimonials.length)}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#c4a55a]/40 hover:text-[#c4a55a] transition-all duration-300"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
