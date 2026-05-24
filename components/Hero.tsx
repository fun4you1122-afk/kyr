'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['Finest', 'Premier', 'Elite', 'Iconic'];

export default function Hero() {
  const [wordIdx, setWordIdx]   = useState(0);
  const [muted, setMuted]       = useState(true);
  const [showScroll, setScroll] = useState(true);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 3000);
    const s = () => setScroll(window.scrollY < 80);
    window.addEventListener('scroll', s, { passive: true });
    return () => { clearInterval(t); window.removeEventListener('scroll', s); };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = muted;
    if (!muted) videoRef.current.play().catch(() => {});
  }, [muted]);

  // GSAP char reveal + parallax
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const init = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo('.hero-char',
          { y: 100, opacity: 0, rotationX: -80 },
          { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: 0.028, delay: 0.5 }
        );
        gsap.fromTo('.hero-sub',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.1 }
        );
        gsap.fromTo('.hero-cta',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 1.4 }
        );
        gsap.fromTo('.hero-stat',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 1.7 }
        );
        // Parallax on scroll
        gsap.to('.hero-content-inner', {
          y: -100, opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end:   'bottom top',
            scrub: true,
          },
        });
      }, sectionRef);
    };
    init();
    return () => ctx?.revert();
  }, []);

  const headline = "Unlocking Dubai's";

  return (
    <section id="home" ref={sectionRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">

      {/* ── Full-screen video background ── */}
      <video
        ref={videoRef}
        src="/KYR.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Cinematic overlays ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(8,8,16,0.55)] via-[rgba(8,8,16,0.25)] to-[rgba(8,8,16,0.85)]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[rgba(8,8,16,0.5)] via-transparent to-[rgba(8,8,16,0.3)]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 z-10 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(196,165,90,1) 1px,transparent 1px),linear-gradient(90deg,rgba(196,165,90,1) 1px,transparent 1px)',
          backgroundSize: '100px 100px',
        }} />

      {/* Aurora glow */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="aurora-1 absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(196,165,90,0.07), transparent 70%)' }} />
        <div className="aurora-2 absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(232,213,163,0.04), transparent 70%)' }} />
      </div>

      {/* ── Main content ── */}
      <div className="hero-content-inner relative z-20 max-w-7xl mx-auto px-6 w-full">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <img
            src="https://i.ibb.co/F4J4BkrX/Untitled-design-3.png"
            alt="KYR Real Estate"
            className="h-14 w-auto"
            style={{ filter: 'drop-shadow(0 0 24px rgba(196,165,90,0.5))' }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex justify-center mb-8"
        >
          <div className="premium-badge">Dubai's Premier Luxury Property Agency</div>
        </motion.div>

        {/* Kinetic headline */}
        <div className="text-center mb-4" style={{ perspective: '1200px' }}>
          <div className="overflow-hidden inline-block">
            <div className="flex flex-wrap justify-center" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 1.05 }}>
              {headline.split('').map((ch, i) => (
                <span
                  key={i}
                  className="hero-char font-serif font-light text-white inline-block opacity-0"
                  style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                >
                  {ch}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Animated cycling word */}
        <div className="flex justify-center overflow-hidden mb-8" style={{ height: 'clamp(3.4rem,7.5vw,7.5rem)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIdx}
              initial={{ y: '100%', opacity: 0, filter: 'blur(12px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: '-100%', opacity: 0, filter: 'blur(12px)' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif font-light text-gold-gradient"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 1.1 }}
            >
              {words[wordIdx]} Properties
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="hero-sub flex justify-center mb-6 opacity-0">
          <div className="flex items-center gap-4">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#c4a55a]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4a55a]" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#c4a55a]" />
          </div>
        </div>

        {/* Subheading */}
        <div className="hero-sub text-center text-white/45 text-sm md:text-base font-light tracking-[0.1em] mb-10 opacity-0">
          Redefining real estate through transparency, expertise, and precision
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          <motion.button
            className="hero-cta opacity-0 px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-black rounded-full"
            style={{ background: 'linear-gradient(135deg,#c4a55a,#e8d5a3,#c4a55a)', backgroundSize: '200%' }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(196,165,90,0.5)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book a Consultation
          </motion.button>
          <motion.button
            className="hero-cta opacity-0 px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium text-white/60 border border-white/15 rounded-full transition-all duration-300 hover:text-[#c4a55a] hover:border-[rgba(196,165,90,0.5)]"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Properties
          </motion.button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 pt-8 border-t border-white/8">
          {[
            { num: '500+',    label: 'Properties Sold' },
            { num: 'AED 2.5B+', label: 'Total Sales' },
            { num: '98%',     label: 'Satisfaction' },
            { num: '1500+',   label: 'Happy Clients' },
          ].map(s => (
            <div key={s.label} className="hero-stat opacity-0 text-center">
              <div className="font-serif text-2xl md:text-3xl text-gold-gradient font-light">{s.num}</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sound toggle ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setMuted(m => !m)}
        className="absolute bottom-8 right-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full"
        style={{
          background: 'rgba(8,8,16,0.65)',
          border: '1px solid rgba(196,165,90,0.35)',
          color: '#c4a55a',
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          backdropFilter: 'blur(12px)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {muted ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
            Sound
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            Mute
          </>
        )}
      </motion.button>

      {/* ── Scroll indicator ── */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ delay: 2.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
          >
            <span className="text-[9px] tracking-[0.35em] uppercase text-white/25">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-px h-10 bg-gradient-to-b from-[#c4a55a] to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
