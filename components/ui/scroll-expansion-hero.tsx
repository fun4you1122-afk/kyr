'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaSrc: string;
  bgImageSrc: string;
  posterSrc?: string;
  title?: string;
  tagline?: string;
  scrollToExpand?: string;
  logoSrc?: string;
  children?: ReactNode;
}

export default function ScrollExpandMedia({
  mediaSrc,
  bgImageSrc,
  posterSrc,
  title,
  tagline,
  scrollToExpand,
  logoSrc,
  children,
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const [muted, setMuted]   = useState(true);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Sync mute state to video
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = muted;
    if (!muted) videoRef.current.play().catch(() => {});
  }, [muted]);

  // ── Natural sticky scroll — no event hijacking ───────────────
  // The container is 4× viewport tall; the inner panel sticks to top.
  // Framer-motion reads scrollY inside the container → drives progress 0→1.
  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ['start start', 'end end'],
  });

  // Video frame size
  const startW = isMobile ? 320 : 360;
  const endW   = isMobile ? 96  : 100; // vw units
  const startH = isMobile ? 420 : 460;
  const endH   = isMobile ? 88  : 92;  // vh units

  const frameW = useTransform(scrollYProgress, [0, 0.75], [`${startW}px`, `${endW}vw`]);
  const frameH = useTransform(scrollYProgress, [0, 0.75], [`${startH}px`, `${endH}vh`]);

  // Text slides apart
  const textL  = useTransform(scrollYProgress, [0, 0.6], ['0vw',  isMobile ? '-45vw' : '-40vw']);
  const textR  = useTransform(scrollYProgress, [0, 0.6], ['0vw',  isMobile ? '45vw'  : '40vw']);

  // Background image fades out as video takes over
  const bgOpacity    = useTransform(scrollYProgress, [0, 0.5],  [1, 0]);
  // Video overlay darkening fades away
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.75], [0.5, 0]);
  // Gold border glow intensifies
  const borderOpacity = useTransform(scrollYProgress, [0, 0.75], [0.08, 0.35]);

  // Scroll hint fades quickly
  const hintOpacity  = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  // Sound button appears
  const soundOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  // Content section fades in at end
  const contentOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // Logo + tagline fade out as text splits
  const logoOpacity  = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const words = (title ?? '').split(' ');
  const first = words.slice(0, Math.ceil(words.length / 2)).join(' ');
  const rest  = words.slice(Math.ceil(words.length / 2)).join(' ');

  return (
    /* ── Tall container — scroll happens here ── */
    <div ref={containerRef} style={{ height: '400vh' }}>

      {/* ── Sticky viewport panel ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">

        {/* Background image */}
        <motion.div className="absolute inset-0 z-0" style={{ opacity: bgOpacity }}>
          <Image
            src={bgImageSrc}
            alt="KYR Real Estate Dubai"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,16,0.55)] via-[rgba(8,8,16,0.3)] to-[rgba(8,8,16,0.8)]" />
        </motion.div>

        {/* Subtle grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(196,165,90,1) 1px,transparent 1px),linear-gradient(90deg,rgba(196,165,90,1) 1px,transparent 1px)',
            backgroundSize: '100px 100px',
          }} />

        {/* ── Expanding video ── */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            style={{
              width:     frameW,
              height:    frameH,
              boxShadow: '0 40px 100px rgba(0,0,0,0.75)',
            }}
          >
            {/* Border glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-20"
              style={{ boxShadow: '0 0 0 1px rgba(196,165,90,0.15)', opacity: borderOpacity }}
            />

            <video
              ref={videoRef}
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />

            {/* Overlay fades away */}
            <motion.div
              className="absolute inset-0 bg-black pointer-events-none"
              style={{ opacity: overlayOpacity }}
            />

            {/* Gold corner brackets */}
            {(['tl','tr','bl','br'] as const).map(c => (
              <div key={c} className={`absolute w-6 h-6 pointer-events-none z-20 ${
                c === 'tl' ? 'top-3 left-3 border-l border-t' :
                c === 'tr' ? 'top-3 right-3 border-r border-t' :
                c === 'bl' ? 'bottom-3 left-3 border-l border-b' :
                             'bottom-3 right-3 border-r border-b'
              } border-[rgba(196,165,90,0.5)]`} />
            ))}

            {/* Sound toggle */}
            <motion.button
              className="absolute bottom-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                opacity: soundOpacity,
                background: 'rgba(8,8,16,0.7)',
                border: '1px solid rgba(196,165,90,0.4)',
                color: '#c4a55a',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                backdropFilter: 'blur(10px)',
              }}
              onClick={() => setMuted(m => !m)}
            >
              {muted ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                  Sound On
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

            {/* Scroll hint */}
            <motion.div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-20"
              style={{ opacity: hintOpacity }}
            >
              {scrollToExpand && (
                <span className="text-[9px] tracking-[0.35em] uppercase text-[rgba(196,165,90,0.75)]">
                  {scrollToExpand}
                </span>
              )}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-px h-6 bg-gradient-to-b from-[#c4a55a] to-transparent"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Headline text that splits apart ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none select-none px-4">
          {/* Logo */}
          <motion.div className="mb-4" style={{ opacity: logoOpacity }}>
            {logoSrc && (
              <img
                src={logoSrc}
                alt="KYR"
                className="h-10 w-auto"
                style={{ filter: 'drop-shadow(0 0 20px rgba(196,165,90,0.6))' }}
              />
            )}
          </motion.div>

          {/* First half */}
          <motion.div
            className="font-serif font-light text-[#e8d5a3]"
            style={{
              x: textL,
              fontSize:      'clamp(2rem, 5vw, 5rem)',
              lineHeight:    1,
              textShadow:    '0 4px 40px rgba(0,0,0,0.95)',
              letterSpacing: '-0.01em',
            }}
          >
            {first}
          </motion.div>

          {/* Second half */}
          <motion.div
            className="font-serif font-light text-gold-gradient mt-1"
            style={{
              x: textR,
              fontSize:      'clamp(2rem, 5vw, 5rem)',
              lineHeight:    1,
              textShadow:    '0 4px 40px rgba(0,0,0,0.95)',
              letterSpacing: '-0.01em',
            }}
          >
            {rest}
          </motion.div>

          {/* Tagline */}
          {tagline && (
            <motion.p
              className="text-[10px] tracking-[0.35em] uppercase mt-3"
              style={{ color: 'rgba(196,165,90,0.6)', opacity: logoOpacity }}
            >
              {tagline}
            </motion.p>
          )}
        </div>

        {/* ── Content revealed at end of scroll ── */}
        <motion.div
          className="absolute inset-0 z-30 flex flex-col justify-end pb-0 pointer-events-none"
          style={{ opacity: contentOpacity }}
        >
          <div className="pointer-events-auto bg-obsidian w-full px-8 py-14 md:px-16 lg:py-20">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
