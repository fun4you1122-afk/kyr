'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let mouse = { x: W / 2, y: H / 2 };

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    const count = 120;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      gold: Math.random() > 0.6,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(196,165,90,${0.06 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) {
          p.vx += dx * 0.00003;
          p.vy += dy * 0.00003;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(196,165,90,${p.opacity})`
          : `rgba(255,255,255,${p.opacity * 0.4})`;
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

const words = ['Finest', 'Premier', 'Elite', 'Iconic'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2800);
    const s = () => setShowScroll(window.scrollY < 100);
    window.addEventListener('scroll', s);
    return () => { clearInterval(t); window.removeEventListener('scroll', s); };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian">

      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080810] via-[#0d0d1e] to-[#080810]" />

      {/* Animated aurora glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-1 absolute top-1/4 left-1/6 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #c4a55a, transparent)' }} />
        <div className="aurora-2 absolute bottom-1/3 right-1/6 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #e8d5a3, transparent)' }} />
        <div className="aurora-3 absolute top-2/3 left-1/2 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #c4a55a, transparent)' }} />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(196,165,90,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(196,165,90,0.8) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Particle system */}
      <ParticleCanvas />

      {/* Dubai skyline silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.07]"
        style={{
          background: 'linear-gradient(to top, rgba(196,165,90,0.15), transparent)',
          clipPath: 'polygon(0% 100%, 0% 60%, 2% 55%, 3% 20%, 4% 15%, 5% 20%, 6% 18%, 7% 12%, 8% 18%, 9% 55%, 10% 50%, 11% 45%, 12% 15%, 13% 10%, 14% 15%, 15% 45%, 16% 40%, 17% 35%, 18% 38%, 19% 20%, 20% 15%, 21% 20%, 22% 40%, 23% 45%, 25% 50%, 27% 30%, 28% 25%, 29% 15%, 30% 12%, 31% 15%, 32% 25%, 33% 30%, 35% 40%, 38% 45%, 40% 50%, 42% 30%, 43% 20%, 44% 10%, 45% 5%, 46% 10%, 47% 20%, 48% 30%, 50% 40%, 52% 45%, 54% 50%, 55% 35%, 56% 25%, 57% 15%, 58% 12%, 59% 15%, 60% 25%, 61% 35%, 63% 40%, 65% 50%, 68% 45%, 70% 40%, 72% 55%, 74% 50%, 76% 45%, 78% 55%, 80% 60%, 82% 50%, 84% 45%, 86% 55%, 88% 50%, 90% 55%, 92% 60%, 94% 55%, 96% 58%, 98% 62%, 100% 60%, 100% 100%)'
        }}
      />

      {/* Main content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Premium badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div className="premium-badge">
              Dubai&apos;s Premier Luxury Property Agency
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="font-serif font-light text-white leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            Unlocking Dubai&apos;s
          </motion.h1>

          {/* Animated word */}
          <motion.div variants={fadeUp} className="overflow-hidden mb-6">
            <div className="relative h-[1.1em] flex justify-center">
              <motion.span
                key={wordIdx}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="font-serif font-light text-gold-gradient absolute"
                style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 1.1 }}
              >
                {words[wordIdx]} Properties
              </motion.span>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c4a55a]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c4a55a]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c4a55a]" />
            </div>
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="text-white/50 text-base md:text-lg font-light tracking-widest max-w-xl mx-auto mb-12"
            style={{ letterSpacing: '0.1em' }}
          >
            Redefining real estate through transparency,<br />
            expertise, and precision
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(196,165,90,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="magnetic px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-black rounded-full"
              style={{ background: 'linear-gradient(135deg, #c4a55a, #e8d5a3, #c4a55a)', backgroundSize: '200%' }}
            >
              Book a Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, borderColor: 'rgba(196,165,90,0.8)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
              className="magnetic px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium text-white/70 border border-white/20 rounded-full hover:text-white transition-all duration-300"
            >
              Explore Properties
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-12 mt-20 pt-12 border-t border-white/5"
          >
            {[
              { num: '500+', label: 'Properties Sold' },
              { num: 'AED 2.5B+', label: 'Total Sales Value' },
              { num: '98%', label: 'Client Satisfaction' },
              { num: '1500+', label: 'Happy Clients' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl text-gold-gradient font-light">{stat.num}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/30 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-[#c4a55a] to-transparent"
        />
      </motion.div>
    </section>
  );
}
