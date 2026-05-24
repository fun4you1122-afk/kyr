'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

const words = ['Finest', 'Premier', 'Elite', 'Iconic'];

// Particle canvas — mouse reactive neural network
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mouse = { x: W / 2, y: H / 2 };

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    const pts = Array.from({ length: 100 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 1.4 + 0.3,
      gold: Math.random() > 0.5,
      opacity: Math.random() * 0.5 + 0.15,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(196,165,90,${0.07 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      pts.forEach(p => {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d  = Math.hypot(dx, dy);
        if (d < 180) { p.vx += dx * 0.00004; p.vy += dy * 0.00004; }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x  += p.vx; p.y  += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(196,165,90,${p.opacity})`
          : `rgba(255,255,255,${p.opacity * 0.35})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}

export default function Hero() {
  const [wordIdx, setWordIdx]   = useState(0);
  const [showScroll, setScroll] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  // Word cycling
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 3000);
    return () => clearInterval(t);
  }, []);

  // Scroll indicator hide
  useEffect(() => {
    const fn = () => setScroll(window.scrollY < 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // GSAP ScrollTrigger — parallax on scroll
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const initGSAP = async () => {
      const { default: gsap }           = await import('gsap');
      const { ScrollTrigger }           = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Hero content fades + shifts up on scroll
        gsap.to('.hero-content', {
          y: -120,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end:   'bottom top',
            scrub: true,
          },
        });

        // Grid lines parallax
        gsap.to('.hero-grid', {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end:   'bottom top',
            scrub: 1.5,
          },
        });

        // Skyline silhouette
        gsap.to('.hero-skyline', {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end:   'bottom top',
            scrub: 2,
          },
        });

        // Staggered headline chars
        gsap.fromTo(
          '.hero-char',
          { y: 120, opacity: 0, rotationX: -90 },
          {
            y: 0, opacity: 1, rotationX: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.03,
            delay: 0.4,
          }
        );

        // Stat items slide up
        gsap.fromTo(
          '.hero-stat',
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            delay: 1.6,
          }
        );
      }, sectionRef);
    };

    initGSAP();
    return () => ctx?.revert();
  }, []);

  const headline = 'Unlocking Dubai\'s';

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* Deep layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080810] via-[#0c0c1c] to-[#080810]" />

      {/* Aurora orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-1 absolute top-1/4 left-1/6 w-[700px] h-[700px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(196,165,90,0.06), transparent 70%)' }} />
        <div className="aurora-2 absolute bottom-1/4 right-1/6 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(232,213,163,0.04), transparent 70%)' }} />
        <div className="aurora-3 absolute top-2/3 left-1/2 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(196,165,90,0.03), transparent 70%)' }} />
      </div>

      {/* Grid */}
      <div className="hero-grid absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(196,165,90,1) 1px,transparent 1px),linear-gradient(90deg,rgba(196,165,90,1) 1px,transparent 1px)',
          backgroundSize: '100px 100px',
        }} />

      {/* Three.js 3D scene — right side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none z-10 opacity-60 hidden lg:block">
        <ThreeScene />
      </div>

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Dubai skyline silhouette */}
      <div
        className="hero-skyline absolute bottom-0 left-0 right-0 h-56 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(196,165,90,0.04), transparent)',
          clipPath: 'polygon(0%100%,0%62%,2%57%,3%22%,4%17%,5%22%,6%20%,7%14%,8%20%,9%57%,10%52%,11%47%,12%17%,13%12%,14%17%,15%47%,16%42%,17%37%,18%40%,19%22%,20%17%,21%22%,22%42%,23%47%,25%52%,27%32%,28%27%,29%17%,30%14%,31%17%,32%27%,33%32%,35%42%,38%47%,40%52%,42%32%,43%22%,44%12%,45%7%,46%12%,47%22%,48%32%,50%42%,52%47%,54%52%,55%37%,56%27%,57%17%,58%14%,59%17%,60%27%,61%37%,63%42%,65%52%,68%47%,70%42%,72%57%,74%52%,76%47%,78%57%,80%62%,82%52%,84%47%,86%57%,88%52%,90%57%,92%62%,94%57%,96%60%,98%64%,100%62%,100%100%)',
        }}
      />

      {/* MAIN CONTENT */}
      <div className="hero-content relative z-20 max-w-7xl mx-auto px-6 pt-24 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            className="flex mb-10"
          >
            <div className="premium-badge">Dubai&apos;s Premier Luxury Property Agency</div>
          </motion.div>

          {/* Kinetic headline — char split */}
          <div className="overflow-hidden mb-4" style={{ perspective: '1000px' }}>
            <div ref={headlineRef} className="flex flex-wrap" style={{ fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 1.05 }}>
              {headline.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-char font-serif font-light text-white inline-block"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal', opacity: 0 }}
                >
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
            </div>
          </div>

          {/* Animated cycling word */}
          <div className="overflow-hidden mb-8" style={{ height: 'clamp(3.2rem,7.5vw,7.5rem)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={wordIdx}
                initial={{ y: '100%', opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: '-100%', opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.75, ease: [0.76,0,0.24,1] }}
                className="font-serif font-light text-gold-gradient"
                style={{ fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 1.1 }}
              >
                {words[wordIdx]} Properties
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.16,1,0.3,1] }}
            className="flex items-center gap-4 mb-8 origin-left"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c4a55a]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4a55a]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c4a55a]" />
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease: [0.16,1,0.3,1] }}
            className="text-white/45 text-base md:text-lg font-light tracking-[0.08em] max-w-md mb-12"
          >
            Redefining real estate through transparency,<br />
            expertise, and precision.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9, ease: [0.16,1,0.3,1] }}
            className="flex flex-wrap gap-4 mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(196,165,90,0.5)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-black rounded-full"
              style={{ background: 'linear-gradient(135deg,#c4a55a,#e8d5a3,#c4a55a)', backgroundSize: '200%' }}
            >
              Book a Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: 'rgba(196,165,90,0.8)', color: '#c4a55a' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium text-white/60 border border-white/15 rounded-full transition-all duration-300"
            >
              Explore Properties
            </motion.button>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 pt-8 border-t border-white/5">
            {[
              { num: '500+', label: 'Properties Sold' },
              { num: 'AED 2.5B+', label: 'Total Sales' },
              { num: '98%', label: 'Satisfaction' },
              { num: '1500+', label: 'Happy Clients' },
            ].map(s => (
              <div key={s.label} className="hero-stat opacity-0 text-left">
                <div className="font-serif text-2xl text-gold-gradient font-light">{s.num}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase text-white/25">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#c4a55a] to-transparent"
        />
      </motion.div>
    </section>
  );
}
