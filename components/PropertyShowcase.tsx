'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const properties = [
  {
    id: '01',
    project: 'PALM JUMEIRAH',
    type: 'OCEAN PENTHOUSE',
    description: "Suspended above Dubai's most iconic palm — a five-bedroom sanctuary where every window frames the Arabian Gulf.",
    specs: [
      { k: 'AREA',   v: '12,400 SQ FT' },
      { k: 'CONFIG', v: '5 BED / 6 BATH' },
      { k: 'PRICE',  v: 'AED 28,500,000' },
      { k: 'STATUS', v: 'READY TO MOVE' },
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90',
    tag: 'EXCLUSIVE',
  },
  {
    id: '02',
    project: 'DOWNTOWN DUBAI',
    type: 'SIGNATURE RESIDENCE',
    description: 'The epicentre of everything. Floor-to-ceiling glass reveals the Burj Khalifa in its full glory from every room.',
    specs: [
      { k: 'AREA',   v: '6,800 SQ FT' },
      { k: 'CONFIG', v: '4 BED / 5 BATH' },
      { k: 'PRICE',  v: 'AED 12,500,000' },
      { k: 'STATUS', v: 'READY TO MOVE' },
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=90',
    tag: 'FEATURED',
  },
  {
    id: '03',
    project: 'EMAAR BEACHFRONT',
    type: 'PRIVATE BEACH RESIDENCE',
    description: 'Step from your terrace onto a private beach. An off-plan masterpiece delivering beachfront living with investment-grade returns.',
    specs: [
      { k: 'AREA',   v: '3,200 SQ FT' },
      { k: 'CONFIG', v: '3 BED / 4 BATH' },
      { k: 'PRICE',  v: 'AED 8,500,000' },
      { k: 'STATUS', v: 'OFF PLAN' },
    ],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=90',
    tag: 'OFF-PLAN',
  },
  {
    id: '04',
    project: 'GOLF ESTATES',
    type: 'CHAMPIONSHIP VILLA',
    description: 'Life on the fairway. A six-bedroom estate overlooking Jumeirah Golf Courses — where world championships are played.',
    specs: [
      { k: 'AREA',   v: '8,900 SQ FT' },
      { k: 'CONFIG', v: '6 BED / 7 BATH' },
      { k: 'PRICE',  v: 'AED 18,000,000' },
      { k: 'STATUS', v: 'READY TO MOVE' },
    ],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=90',
    tag: 'GOLF FRONT',
  },
];

const N = properties.length;

function useScene(progress: ReturnType<typeof useScroll>['scrollYProgress'], i: number) {
  const step = 1 / N;
  const enter = i * step;
  const peak  = enter + step * 0.2;
  const hold  = enter + step * 0.75;
  const exit  = enter + step;
  return {
    opacity: useTransform(progress, [enter, peak, hold, exit], [0, 1, 1, 0]),
    imgScale: useTransform(progress, [enter, hold], [1.08, 1.0]),
  };
}

export default function PropertyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scenes = properties.map((_, i) => useScene(scrollYProgress, i));

  return (
    <div ref={containerRef} style={{ height: `${N * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#06060a]">

        {/* Scene layers */}
        {properties.map((p, i) => (
          <motion.div
            key={p.id}
            className="absolute inset-0 flex"
            style={{ opacity: scenes[i].opacity }}
          >
            {/* ── Left panel ── */}
            <div className="relative z-10 w-[38%] h-full bg-[#06060a] flex flex-col justify-between py-12 px-10 border-r border-white/[0.06] shrink-0">

              {/* Top bar */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.35em] uppercase text-white/20">KYR Real Estate</span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-white/20">{p.id} / 0{N}</span>
              </div>

              {/* Main content */}
              <div>
                {/* Tag */}
                <div className="inline-block px-3 py-1 border border-[rgba(196,165,90,0.3)] text-[#c4a55a] text-[9px] tracking-[0.3em] uppercase mb-6">
                  {p.tag}
                </div>

                {/* Project name */}
                <h2
                  className="text-white leading-[0.92] mb-3 uppercase"
                  style={{ fontSize: 'clamp(2.2rem, 3.5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.01em' }}
                >
                  {p.project}
                </h2>

                {/* Type */}
                <div className="text-white/35 text-[10px] tracking-[0.3em] uppercase mb-6">{p.type}</div>

                {/* Gold divider */}
                <div className="w-10 h-px bg-[#c4a55a] mb-6" />

                {/* Description */}
                <p className="text-white/35 text-xs leading-relaxed mb-8 max-w-xs">
                  {p.description}
                </p>

                {/* Specs */}
                <div className="flex flex-col gap-3">
                  {p.specs.map(spec => (
                    <div key={spec.k} className="flex items-center gap-2">
                      <span className="text-[#c4a55a] text-xs leading-none">+</span>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-white/25 w-16 shrink-0">{spec.k}</span>
                      <span className="text-[9px] tracking-[0.1em] uppercase text-white/55">{spec.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-3 group"
                >
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4a55a] group-hover:text-white transition-colors duration-300">
                    ENQUIRE NOW
                  </span>
                  <motion.span
                    className="text-[#c4a55a] text-sm"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </button>
                {/* Progress bar */}
                <div className="h-px bg-white/5">
                  <motion.div
                    className="h-full bg-[#c4a55a]"
                    style={{
                      width: useTransform(
                        scrollYProgress,
                        [i / N, (i + 1) / N],
                        ['0%', '100%']
                      ),
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Right panel: image ── */}
            <div className="flex-1 relative overflow-hidden">
              <motion.img
                src={p.image}
                alt={p.project}
                className="w-full h-full object-cover"
                style={{ scale: scenes[i].imgScale }}
              />
              {/* Subtle left-edge vignette blending into left panel */}
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,6,10,0.5)] via-transparent to-transparent" />
              {/* Bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,10,0.4)] via-transparent to-transparent" />

              {/* Scene number — bottom right */}
              <div className="absolute bottom-10 right-10 text-right">
                <div className="font-serif text-[6rem] leading-none text-white/[0.04] select-none">{p.id}</div>
              </div>

              {/* Top right: "ENTER FULL DETAILS" */}
              <button
                onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
                className="absolute top-10 right-10 text-[9px] tracking-[0.35em] uppercase text-white/25 hover:text-[#c4a55a] transition-colors duration-300 flex items-center gap-2"
              >
                <span className="w-6 h-px bg-current" />
                VIEW ALL PROPERTIES
              </button>
            </div>
          </motion.div>
        ))}

        {/* Vertical scene dots — far right */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {properties.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-white/20"
              style={{
                height: useTransform(scenes[i].opacity, [0, 1], [4, 16]),
                width: 2,
                backgroundColor: useTransform(scenes[i].opacity, [0, 1], ['rgba(255,255,255,0.2)', 'rgba(196,165,90,0.8)']),
              }}
            />
          ))}
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-8 left-[38%] right-0 flex justify-center z-20">
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/15">Scroll to Explore</span>
        </div>
      </div>
    </div>
  );
}
