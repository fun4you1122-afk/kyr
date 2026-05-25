'use client';
import { useEffect, useRef } from 'react';

const slides = [
  {
    num: '01',
    title: 'Palm Jumeirah',
    sub: 'Ocean Penthouse',
    price: 'AED 28,500,000',
    area: '12,400 sqft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85',
  },
  {
    num: '02',
    title: 'Downtown Dubai',
    sub: 'Signature Residence',
    price: 'AED 12,500,000',
    area: '6,800 sqft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85',
  },
  {
    num: '03',
    title: 'Emaar Beachfront',
    sub: 'Private Beach Villa',
    price: 'AED 8,500,000',
    area: '3,200 sqft',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=85',
  },
  {
    num: '04',
    title: 'Business Bay',
    sub: 'Sky Suite',
    price: 'AED 3,200,000',
    area: '1,850 sqft',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85',
  },
  {
    num: '05',
    title: 'Golf Estates',
    sub: 'Championship Villa',
    price: 'AED 18,000,000',
    area: '8,900 sqft',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85',
  },
  {
    num: '06',
    title: 'DIFC',
    sub: 'Luxury Loft',
    price: 'AED 4,800,000',
    area: '2,100 sqft',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85',
  },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap }  = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const totalScroll = track.scrollWidth - window.innerWidth;

      ctx = gsap.context(() => {

        // ── 1. Pin the section and scroll the track horizontally ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1.2,
            start: 'top top',
            end: () => `+=${totalScroll + window.innerHeight * 0.5}`,
            invalidateOnRefresh: true,
          },
        });

        tl.to(track, { x: -totalScroll, ease: 'none' });

        // ── 2. Stagger-reveal each card as it enters the viewport ──
        gsap.utils.toArray<HTMLElement>('.hg-card').forEach((card, i) => {
          const img  = card.querySelector('.hg-img') as HTMLElement;
          const meta = card.querySelector('.hg-meta') as HTMLElement;

          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );

          gsap.fromTo(
            meta,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: 'left 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // ── 3. Scrub headline chars with horizontal progress ──
        const chars = headlineRef.current?.querySelectorAll<HTMLElement>('.hg-char');
        if (chars?.length) {
          gsap.fromTo(
            chars,
            { opacity: 0.08, color: 'rgba(255,255,255,0.08)' },
            {
              opacity: 1,
              color: '#ffffff',
              stagger: { each: 0.06, from: 'start' },
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'top top',
                scrub: 0.8,
              },
            }
          );
        }

      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  const headline = 'OUR PORTFOLIO';

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#06060a] overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.2)] to-transparent" />

      {/* Section label */}
      <div className="absolute top-8 left-10 z-20 flex items-center gap-3">
        <div className="w-6 h-px bg-[#c4a55a]" />
        <span className="text-[9px] tracking-[0.35em] uppercase text-[#c4a55a]">Scroll Horizontally</span>
      </div>

      {/* Scrub headline */}
      <div
        ref={headlineRef}
        className="absolute top-16 left-10 z-20 flex overflow-hidden"
        style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.02em' }}
      >
        {headline.split('').map((ch, i) => (
          <span
            key={i}
            className="hg-char inline-block"
            style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal', opacity: 0.08, color: 'rgba(255,255,255,0.08)' }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex items-center gap-6 pl-10"
        style={{ paddingTop: '14rem', paddingRight: '10vw', willChange: 'transform' }}
      >
        {slides.map((s) => (
          <div
            key={s.num}
            className="hg-card relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group"
            style={{ width: 'clamp(300px, 28vw, 420px)', height: 'clamp(380px, 52vh, 520px)' }}
          >
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                className="hg-img w-full h-full object-cover"
                style={{ transformOrigin: 'center center' }}
              />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,10,0.9)] via-[rgba(6,6,10,0.2)] to-transparent" />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[rgba(196,165,90,0.04)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border border-[rgba(196,165,90,0)] group-hover:border-[rgba(196,165,90,0.25)] rounded-2xl transition-all duration-500" />

            {/* Number */}
            <div className="absolute top-5 left-5 font-serif text-5xl text-white/10 font-light select-none group-hover:text-white/15 transition-colors duration-500">
              {s.num}
            </div>

            {/* Meta */}
            <div className="hg-meta absolute bottom-0 left-0 right-0 p-6">
              <div className="text-[9px] tracking-[0.25em] uppercase text-[#c4a55a] mb-1">{s.sub}</div>
              <h3 className="text-white font-bold uppercase text-xl leading-tight mb-3" style={{ letterSpacing: '-0.01em' }}>
                {s.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs">{s.area}</span>
                <span className="text-[#c4a55a] text-sm font-medium">{s.price}</span>
              </div>

              {/* Slide-in CTA on hover */}
              <div
                className="mt-4 overflow-hidden"
                style={{ height: 0, transition: 'height 0.4s cubic-bezier(0.16,1,0.3,1)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.height = '36px'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.height = '0'; }}
              >
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-2 text-[9px] tracking-[0.3em] uppercase text-black font-semibold rounded-full"
                  style={{ background: 'linear-gradient(135deg,#c4a55a,#e8d5a3)' }}
                >
                  Enquire
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* End card */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center gap-6 rounded-2xl border border-[rgba(196,165,90,0.15)]"
          style={{ width: 'clamp(240px, 22vw, 320px)', height: 'clamp(380px, 52vh, 520px)' }}
        >
          <div className="w-10 h-px bg-[#c4a55a]" />
          <div className="text-center px-8">
            <div className="font-serif text-3xl text-white font-light mb-2">See All</div>
            <div className="text-white/30 text-xs leading-relaxed">Explore our full portfolio of curated Dubai properties</div>
          </div>
          <button
            onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 rounded-full text-xs tracking-[0.2em] uppercase text-[#c4a55a] border border-[rgba(196,165,90,0.3)] hover:bg-[rgba(196,165,90,0.08)] transition-all duration-300"
          >
            Full Portfolio
          </button>
        </div>
      </div>

      {/* Drag hint — bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 text-white/20">
        <span className="text-[9px] tracking-[0.3em] uppercase">Drag or Scroll</span>
        <div className="flex gap-1">
          <span className="text-xs">←</span>
          <span className="text-xs">→</span>
        </div>
      </div>
    </section>
  );
}
