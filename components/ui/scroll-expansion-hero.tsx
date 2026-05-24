'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent as ReactTouchEvent,
  WheelEvent as ReactWheelEvent,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  tagline?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  logoSrc?: string;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  tagline,
  scrollToExpand,
  textBlend,
  children,
  logoSrc,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent]       = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY]       = useState<number>(0);
  const [isMobile, setIsMobile]             = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const delta = e.deltaY * 0.0009;
        const next  = Math.min(Math.max(scrollProgress + delta, 0), 1);
        setScrollProgress(next);
        if (next >= 1)       { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) { setShowContent(false); }
      }
    };

    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false); e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        const next   = Math.min(Math.max(scrollProgress + deltaY * factor, 0), 1);
        setScrollProgress(next);
        if (next >= 1)        { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) { setShowContent(false); }
        setTouchStartY(e.touches[0].clientY);
      }
    };

    const handleTouchEnd  = () => setTouchStartY(0);
    const handleScroll    = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel',      handleWheel,      { passive: false });
    window.addEventListener('scroll',     handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove',  handleTouchMove,  { passive: false });
    window.addEventListener('touchend',   handleTouchEnd);
    return () => {
      window.removeEventListener('wheel',      handleWheel);
      window.removeEventListener('scroll',     handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove',  handleTouchMove);
      window.removeEventListener('touchend',   handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const mediaW = 320 + scrollProgress * (isMobile ? 620 : 1220);
  const mediaH = 420 + scrollProgress * (isMobile ? 220 : 420);
  const textTX = scrollProgress * (isMobile ? 180 : 150);

  const firstWord  = title ? title.split(' ')[0] : '';
  const restTitle  = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Background image — fades as video expands */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen object-cover object-center"
              priority
            />
            {/* Dark overlay + gold tint */}
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,16,0.55)] via-[rgba(8,8,16,0.4)] to-[rgba(8,8,16,0.75)]" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Expanding media */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width:     `${mediaW}px`,
                  height:    `${mediaH}px`,
                  maxWidth:  '95vw',
                  maxHeight: '85vh',
                  boxShadow: `0 0 ${40 + scrollProgress * 60}px rgba(196,165,90,${0.15 + scrollProgress * 0.2}), 0 30px 80px rgba(0,0,0,0.6)`,
                  border: `1px solid rgba(196,165,90,${0.1 + scrollProgress * 0.2})`,
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') || mediaSrc.includes('youtu.be') ? (
                    <div className="relative w-full h-full pointer-events-none">
                      <iframe
                        width="100%" height="100%"
                        src={
                          mediaSrc.includes('embed')
                            ? `${mediaSrc}${mediaSrc.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1`
                            : `${mediaSrc.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${mediaSrc.split('v=')[1]?.split('&')[0]}`
                        }
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/20"
                        animate={{ opacity: 0.5 - scrollProgress * 0.4 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full pointer-events-none">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay muted loop playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to bottom, rgba(8,8,16,0.2), rgba(8,8,16,0.4))' }}
                        animate={{ opacity: 0.6 - scrollProgress * 0.5 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || 'Property'}
                      width={1280} height={720}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/40"
                      animate={{ opacity: 0.7 - scrollProgress * 0.4 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                {/* Gold corner accents on the expanding frame */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-[rgba(196,165,90,0.6)]" />
                <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-[rgba(196,165,90,0.6)]" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-[rgba(196,165,90,0.6)]" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-[rgba(196,165,90,0.6)]" />

                {/* Scroll hint inside frame */}
                {scrollToExpand && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
                    style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}>
                    <span className="text-[9px] tracking-[0.3em] uppercase text-[rgba(196,165,90,0.7)]">{scrollToExpand}</span>
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-px h-6 bg-gradient-to-b from-[#c4a55a] to-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Headline text that splits apart as video expands */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col px-4 ${
                  textBlend ? 'mix-blend-difference' : ''
                }`}
              >
                {/* Logo above first word */}
                {logoSrc && (
                  <motion.div
                    style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
                    className="mb-2"
                  >
                    <img src={logoSrc} alt="KYR" className="h-10 w-auto"
                      style={{ filter: 'drop-shadow(0 0 16px rgba(196,165,90,0.5))' }} />
                  </motion.div>
                )}

                <div
                  className="font-serif font-light leading-none"
                  style={{
                    transform: `translateX(-${textTX}vw)`,
                    fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                    color: '#e8d5a3',
                    textShadow: '0 2px 40px rgba(0,0,0,0.8)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {firstWord}
                </div>

                <div
                  className="font-serif font-light leading-none text-gold-gradient"
                  style={{
                    transform: `translateX(${textTX}vw)`,
                    fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                    textShadow: '0 2px 40px rgba(0,0,0,0.8)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {restTitle}
                </div>

                {tagline && (
                  <p
                    className="text-xs tracking-[0.3em] uppercase font-light mt-2"
                    style={{
                      color: 'rgba(196,165,90,0.7)',
                      opacity: Math.max(0, 1 - scrollProgress * 2.5),
                    }}
                  >
                    {tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Content below (revealed after full expand) */}
            <motion.section
              className="flex flex-col w-full px-8 py-12 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.8 }}
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
