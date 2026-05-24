'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function VideoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[#060609]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-12"
        >
          <div className="premium-badge mb-4 inline-block">Experience Dubai</div>
          <h2 className="font-serif font-light text-white" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Live the <span className="text-gold-gradient">Dubai Dream</span>
          </h2>
        </motion.div>

        {/* Video frame */}
        <motion.div
          className="relative rounded-3xl overflow-hidden aspect-video"
          style={{ scale, opacity, boxShadow: '0 60px 120px rgba(0,0,0,0.8), 0 0 80px rgba(196,165,90,0.06)', border: '1px solid rgba(196,165,90,0.1)' }}
        >
          {/* Cinematic gradient showcase — users can replace with actual video */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated gradient simulating a luxury scene */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d1e] via-[#1a1a3e] to-[#0d0d1e]" />

            {/* Moving light beams */}
            <motion.div
              animate={{
                x: ['-20%', '120%'],
                opacity: [0, 0.3, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 bottom-0 w-32 blur-3xl"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(196,165,90,0.3), transparent)' }}
            />
            <motion.div
              animate={{
                x: ['120%', '-20%'],
                opacity: [0, 0.2, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 3 }}
              className="absolute top-0 bottom-0 w-20 blur-3xl"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(232,213,163,0.2), transparent)' }}
            />

            {/* Dubai skyline silhouette overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 opacity-20"
              style={{
                background: 'linear-gradient(to top, rgba(196,165,90,0.08), transparent)',
                clipPath: 'polygon(0% 100%, 0% 40%, 5% 35%, 8% 10%, 10% 35%, 15% 30%, 20% 5%, 22% 2%, 24% 5%, 25% 30%, 28% 35%, 30% 55%, 33% 25%, 35% 20%, 38% 8%, 40% 5%, 42% 8%, 44% 20%, 45% 35%, 48% 50%, 50% 30%, 52% 20%, 54% 8%, 56% 4%, 58% 8%, 60% 20%, 62% 30%, 65% 40%, 68% 35%, 70% 45%, 73% 40%, 76% 50%, 80% 45%, 83% 50%, 86% 55%, 89% 50%, 92% 55%, 95% 58%, 98% 60%, 100% 58%, 100% 100%)'
              }} />

            {/* Overlay text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="font-serif text-6xl text-white/10 font-light">Dubai</div>
              <div className="text-[10px] tracking-[0.5em] uppercase text-[rgba(196,165,90,0.3)]">The City of the Future</div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-[rgba(196,165,90,0.3)]" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-[rgba(196,165,90,0.3)]" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-[rgba(196,165,90,0.3)]" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-[rgba(196,165,90,0.3)]" />
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full glass-strong flex items-center justify-center cursor-pointer"
              style={{ border: '1px solid rgba(196,165,90,0.4)', boxShadow: '0 0 40px rgba(196,165,90,0.15)' }}
            >
              <div className="w-0 h-0 ml-2"
                style={{ borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid rgba(196,165,90,0.9)' }} />
            </motion.div>
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] uppercase text-white/20">
            Aerial Tour · Dubai 2026
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-white/25 text-xs mt-6"
        >
          Experience the grandeur of Dubai&apos;s most prestigious neighbourhoods — from above and within
        </motion.p>
      </div>
    </section>
  );
}
