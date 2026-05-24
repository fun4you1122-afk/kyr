'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ScrollExpandMedia = dynamic(
  () => import('@/components/ui/scroll-expansion-hero'),
  { ssr: false }
);

// Hero content shown after video fully expands
function HeroContent() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pt-4 border-t border-[rgba(196,165,90,0.15)]">
        {[
          { num: '500+',    label: 'Properties Sold' },
          { num: 'AED 2.5B+', label: 'Total Sales Value' },
          { num: '98%',     label: 'Client Satisfaction' },
          { num: '1500+',   label: 'Happy Clients' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className="font-serif text-4xl text-gold-gradient font-light">{s.num}</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/30 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Services tease */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: '🏠', title: 'Buy Property', desc: 'Off-plan and ready luxury properties across Dubai\'s most prestigious addresses.' },
          { icon: '🔑', title: 'Rent Property', desc: 'Premium furnished residences with flexible terms for discerning clients.' },
          { icon: '🌟', title: 'Golden Visa', desc: 'Secure your 10-year UAE residency through strategic property investment from AED 2M.' },
        ].map(s => (
          <motion.div
            key={s.title}
            whileHover={{ y: -6, borderColor: 'rgba(196,165,90,0.4)' }}
            className="luxury-card rounded-2xl p-6 cursor-pointer"
          >
            <div className="text-2xl mb-3">{s.icon}</div>
            <h3 className="font-serif text-lg text-white font-light mb-2">{s.title}</h3>
            <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(196,165,90,0.4)' }}
          whileTap={{ scale: 0.96 }}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-black rounded-full"
          style={{ background: 'linear-gradient(135deg,#c4a55a,#e8d5a3,#c4a55a)', backgroundSize: '200%' }}
        >
          Book a Consultation
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04, borderColor: 'rgba(196,165,90,0.8)' }}
          whileTap={{ scale: 0.96 }}
          onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium text-white/60 border border-white/15 rounded-full transition-all duration-300 hover:text-[#c4a55a]"
        >
          Explore Properties
        </motion.button>
      </div>
    </div>
  );
}

export default function Hero() {
  // GSAP ScrollTrigger for sections below hero
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const init = async () => {
      const { default: gsap }  = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo('.hero-stat', { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.3,
        });
      });
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="home">
      <ScrollExpandMedia
        mediaType="video"
        /* ─── REPLACE with your own video URL ─── */
        mediaSrc="https://www.youtube.com/watch?v=vx5PZbgPAEE"
        /* ─── background shown before expansion ─── */
        bgImageSrc="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85"
        posterSrc="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1280&q=80"
        title="Unlocking Dubai's Finest Properties"
        tagline="Dubai's Premier Luxury Property Agency"
        scrollToExpand="Scroll to Enter"
        logoSrc="https://i.ibb.co/F4J4BkrX/Untitled-design-3.png"
        textBlend={false}
      >
        <HeroContent />
      </ScrollExpandMedia>
    </section>
  );
}
