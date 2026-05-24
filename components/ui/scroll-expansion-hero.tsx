'use client';

import {
  useEffect, useRef, useState, ReactNode,
} from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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

const ScrollExpandMedia = ({
  mediaSrc,
  bgImageSrc,
  posterSrc,
  title,
  tagline,
  scrollToExpand,
  logoSrc,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress]   = useState(0);
  const [showContent, setShowContent]         = useState(false);
  const [fullyExpanded, setFullyExpanded]     = useState(false);
  const [muted, setMuted]                     = useState(true);
  const [touchStartY, setTouchStartY]         = useState(0);
  const [isMobile, setIsMobile]               = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // wheel / touch scroll handler
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (fullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setFullyExpanded(false);
        e.preventDefault();
        return;
      }
      if (!fullyExpanded) {
        e.preventDefault();
        const next = Math.min(Math.max(scrollProgress + e.deltaY * 0.0009, 0), 1);
        setScrollProgress(next);
        if (next >= 1)        { setFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) { setShowContent(false); }
      }
    };

    const onTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY);
    const onTouchMove  = (e: TouchEvent) => {
      if (!touchStartY) return;
      const delta = touchStartY - e.touches[0].clientY;
      if (fullyExpanded && delta < -20 && window.scrollY <= 5) {
        setFullyExpanded(false); e.preventDefault(); return;
      }
      if (!fullyExpanded) {
        e.preventDefault();
        const factor = delta < 0 ? 0.008 : 0.005;
        const next   = Math.min(Math.max(scrollProgress + delta * factor, 0), 1);
        setScrollProgress(next);
        if (next >= 1)        { setFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) { setShowContent(false); }
        setTouchStartY(e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => setTouchStartY(0);
    const onScroll   = () => { if (!fullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('scroll',     onScroll);
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });
    window.addEventListener('touchend',   onTouchEnd);
    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('scroll',     onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [scrollProgress, fullyExpanded, touchStartY]);

  // sync muted state to video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
      if (!muted) videoRef.current.play().catch(() => {});
    }
  }, [muted]);

  const W   = 300 + scrollProgress * (isMobile ? 650 : 1300);
  const H   = 400 + scrollProgress * (isMobile ? 200 : 430);
  const tx  = scrollProgress * (isMobile ? 170 : 145);

  const words  = title?.split(' ') ?? [];
  const first  = words.slice(0, 1).join(' ');
  const rest   = words.slice(1).join(' ');

  return (
    <div className="overflow-x-hidden bg-obsidian">
      <section className="relative flex flex-col items-center min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* ── Background image fades as video expands ── */}
          <motion.div
            className="absolute inset-0 z-0"
            animate={{ opacity: 1 - scrollProgress * 1.4 }}
            transition={{ duration: 0.05 }}
          >
            <Image
              src={bgImageSrc}
              alt="KYR Real Estate Dubai"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,16,0.6)] via-[rgba(8,8,16,0.35)] to-[rgba(8,8,16,0.8)]" />
          </motion.div>

          {/* ── Grid overlay ── */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(196,165,90,1) 1px,transparent 1px),linear-gradient(90deg,rgba(196,165,90,1) 1px,transparent 1px)',
              backgroundSize: '100px 100px',
            }} />

          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* ── Expanding video frame ── */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width:     `${W}px`,
                  height:    `${H}px`,
                  maxWidth:  '96vw',
                  maxHeight: '88vh',
                  boxShadow: `0 0 ${30 + scrollProgress * 80}px rgba(196,165,90,${0.12 + scrollProgress * 0.25}), 0 40px 100px rgba(0,0,0,0.7)`,
                  border:    `1px solid rgba(196,165,90,${0.08 + scrollProgress * 0.25})`,
                  transition: 'none',
                }}
              >
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

                {/* Cinematic dark overlay — fades as video expands */}
                <motion.div
                  className="absolute inset-0 bg-black pointer-events-none"
                  animate={{ opacity: Math.max(0, 0.45 - scrollProgress * 0.45) }}
                  transition={{ duration: 0.05 }}
                />

                {/* Gold corner brackets */}
                {(['tl','tr','bl','br'] as const).map(c => (
                  <div key={c} className={`absolute w-7 h-7 pointer-events-none ${
                    c === 'tl' ? 'top-4 left-4 border-l border-t' :
                    c === 'tr' ? 'top-4 right-4 border-r border-t' :
                    c === 'bl' ? 'bottom-4 left-4 border-l border-b' :
                                 'bottom-4 right-4 border-r border-b'
                  } border-[rgba(196,165,90,0.55)]`} />
                ))}

                {/* Sound toggle — appears inside video frame */}
                <AnimatePresence>
                  {scrollProgress > 0.2 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setMuted(m => !m)}
                      className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-3 py-2 rounded-full glass-strong text-[10px] tracking-[0.15em] uppercase"
                      style={{ border: '1px solid rgba(196,165,90,0.4)', color: '#c4a55a' }}
                    >
                      {muted ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                            <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                          </svg>
                          Sound
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                          </svg>
                          Mute
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Scroll hint */}
                {scrollToExpand && (
                  <div
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
                    style={{ opacity: Math.max(0, 1 - scrollProgress * 4) }}
                  >
                    <span className="text-[9px] tracking-[0.35em] uppercase text-[rgba(196,165,90,0.75)]">{scrollToExpand}</span>
                    <motion.div
                      animate={{ y: [0, 7, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-px h-6 bg-gradient-to-b from-[#c4a55a] to-transparent"
                    />
                  </div>
                )}
              </div>

              {/* ── Headline text that splits apart ── */}
              <div className="relative z-20 flex flex-col items-center justify-center text-center gap-3 w-full pointer-events-none select-none px-4">
                {logoSrc && (
                  <div style={{ opacity: Math.max(0, 1 - scrollProgress * 2.5) }}>
                    <img
                      src={logoSrc}
                      alt="KYR"
                      className="h-12 w-auto mb-3"
                      style={{ filter: 'drop-shadow(0 0 20px rgba(196,165,90,0.6))' }}
                    />
                  </div>
                )}

                <div
                  className="font-serif font-light text-[#e8d5a3]"
                  style={{
                    transform:   `translateX(-${tx}vw)`,
                    fontSize:    'clamp(2.2rem, 5.5vw, 5.5rem)',
                    lineHeight:  1,
                    textShadow:  '0 4px 40px rgba(0,0,0,0.9)',
                    letterSpacing: '-0.01em',
                    willChange:  'transform',
                  }}
                >
                  {first}
                </div>

                <div
                  className="font-serif font-light text-gold-gradient"
                  style={{
                    transform:   `translateX(${tx}vw)`,
                    fontSize:    'clamp(2.2rem, 5.5vw, 5.5rem)',
                    lineHeight:  1,
                    textShadow:  '0 4px 40px rgba(0,0,0,0.9)',
                    letterSpacing: '-0.01em',
                    willChange:  'transform',
                  }}
                >
                  {rest}
                </div>

                {tagline && (
                  <p
                    className="text-[10px] tracking-[0.35em] uppercase mt-1"
                    style={{
                      color:   'rgba(196,165,90,0.65)',
                      opacity: Math.max(0, 1 - scrollProgress * 3),
                    }}
                  >
                    {tagline}
                  </p>
                )}
              </div>
            </div>

            {/* ── Content revealed after full expand ── */}
            <motion.section
              className="flex flex-col w-full px-8 py-14 md:px-16 lg:py-24 bg-obsidian"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.9 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
