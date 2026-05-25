'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const scenes = [
  {
    id: '01',
    title: 'The City of Possibility',
    subtitle: 'Dubai Awaits',
    body: 'A skyline built for the exceptional. 200+ nationalities, zero income tax, and the world\'s most ambitious real estate market — all in one city.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85',
    accent: 'From AED 800K',
    accentLabel: 'Entry Price',
    align: 'left',
  },
  {
    id: '02',
    title: 'Residences Crafted for the Extraordinary',
    subtitle: 'Discover Properties',
    body: 'Every property in our portfolio is hand-selected — off-plan masterpieces from Emaar, Meraas, and Nakheel, or ready residences in Dubai\'s most coveted addresses.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=85',
    accent: '500+',
    accentLabel: 'Curated Listings',
    align: 'right',
  },
  {
    id: '03',
    title: 'Life Beyond Four Walls',
    subtitle: 'The Lifestyle',
    body: 'Private pools, beach clubs, Michelin-starred dining, championship golf — owning in Dubai is owning a front-row seat to the world\'s most aspirational lifestyle.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=85',
    accent: '98%',
    accentLabel: 'Client Satisfaction',
    align: 'left',
  },
  {
    id: '04',
    title: 'Your Moment is Now',
    subtitle: 'Make It Yours',
    body: 'The Dubai market waits for no one. Our advisors are ready to guide you from first consultation to key handover — with clarity, precision, and no compromise.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=85',
    accent: '8+',
    accentLabel: 'Years of Expertise',
    align: 'center',
  },
];

function useSceneOpacity(progress: ReturnType<typeof useScroll>['scrollYProgress'], enter: number, peak: number, exit: number, out: number) {
  return useTransform(progress, [enter, peak, exit, out], [0, 1, 1, 0]);
}

function useSceneY(progress: ReturnType<typeof useScroll>['scrollYProgress'], enter: number, peak: number) {
  return useTransform(progress, [enter, peak], [50, 0]);
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Each scene occupies 25% of scroll progress
  // Overlap slightly for cinematic crossfade
  const s = scenes.map((_, i) => {
    const start  = i * 0.22;
    const peak   = start + 0.06;
    const stay   = start + 0.18;
    const end    = start + 0.26;
    return {
      opacity: useTransform(scrollYProgress, [start, peak, stay, end], [0, 1, 1, 0]),
      y:       useTransform(scrollYProgress, [start, peak], ['40px', '0px']),
      scale:   useTransform(scrollYProgress, [start, peak, stay, end], [1.06, 1, 1, 0.96]),
    };
  });

  // Progress indicator
  const sceneIndex = useTransform(scrollYProgress, [0, 0.22, 0.44, 0.66, 0.88, 1], [0, 1, 2, 3, 3, 3]);

  return (
    <div ref={containerRef} style={{ height: '500vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">

        {/* Scene layers */}
        {scenes.map((scene, i) => (
          <motion.div
            key={scene.id}
            className="absolute inset-0"
            style={{ opacity: s[i].opacity }}
          >
            {/* Background image with parallax scale */}
            <motion.div
              className="absolute inset-0"
              style={{ scale: s[i].scale }}
            >
              <img
                src={scene.image}
                alt={scene.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,16,0.5)] via-[rgba(8,8,16,0.2)] to-[rgba(8,8,16,0.85)]" />
            <div className={`absolute inset-0 ${
              scene.align === 'left'   ? 'bg-gradient-to-r from-[rgba(8,8,16,0.7)] via-transparent to-transparent' :
              scene.align === 'right'  ? 'bg-gradient-to-l from-[rgba(8,8,16,0.7)] via-transparent to-transparent' :
              'bg-gradient-to-b from-transparent via-transparent to-[rgba(8,8,16,0.6)]'
            }`} />

            {/* Text content */}
            <motion.div
              className={`absolute inset-0 flex items-center ${
                scene.align === 'right' ? 'justify-end' :
                scene.align === 'center' ? 'justify-center' : 'justify-start'
              }`}
              style={{ y: s[i].y }}
            >
              <div className={`max-w-xl px-8 md:px-16 ${scene.align === 'center' ? 'text-center' : ''}`}>
                {/* Scene number */}
                <div className="flex items-center gap-3 mb-4" style={{ justifyContent: scene.align === 'center' ? 'center' : 'flex-start' }}>
                  <div className="h-px w-8 bg-[#c4a55a]" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#c4a55a]">{scene.subtitle}</span>
                </div>

                {/* Title */}
                <h2
                  className="font-serif font-light text-white leading-tight mb-4"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  {scene.title}
                </h2>

                {/* Body */}
                <p className="text-white/55 text-sm md:text-base font-light leading-relaxed mb-8 max-w-md">
                  {scene.body}
                </p>

                {/* Accent stat */}
                <div className="inline-flex items-center gap-4 glass-strong rounded-2xl px-6 py-4"
                  style={{ border: '1px solid rgba(196,165,90,0.2)' }}>
                  <div>
                    <div className="font-serif text-3xl text-gold-gradient font-light">{scene.accent}</div>
                    <div className="text-[9px] tracking-[0.2em] uppercase text-white/30">{scene.accentLabel}</div>
                  </div>
                  {i === 3 && (
                    <button
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="ml-4 px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-semibold text-black rounded-full"
                      style={{ background: 'linear-gradient(135deg,#c4a55a,#e8d5a3)' }}
                    >
                      Start Now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Scene counter — top right */}
        <div className="absolute top-24 right-8 z-30 flex flex-col gap-2">
          {scenes.map((scene, i) => (
            <motion.div
              key={scene.id}
              className="flex items-center gap-2"
              style={{ opacity: s[i].opacity }}
            >
              <span className="text-[9px] tracking-[0.2em] text-white/40">{scene.id}</span>
              <motion.div
                className="h-px rounded-full"
                style={{
                  width: useTransform(s[i].opacity, [0.3, 1], ['8px', '24px']),
                  background: 'rgba(196,165,90,0.6)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase text-white/20">Scroll to Explore</p>
        </div>
      </div>
    </div>
  );
}
