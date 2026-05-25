'use client';
import { useState, useEffect } from 'react';

import LoadingScreen     from '@/components/LoadingScreen';
import MagneticCursor    from '@/components/MagneticCursor';
import Navbar            from '@/components/Navbar';
import Hero              from '@/components/Hero';
import About             from '@/components/About';
import Services          from '@/components/Services';
import Properties        from '@/components/Properties';
import Stats             from '@/components/Stats';
import ScrollStory       from '@/components/ScrollStory';
import DubaiSection      from '@/components/DubaiSection';
import Investment        from '@/components/Investment';
import Testimonials      from '@/components/Testimonials';
import Contact           from '@/components/Contact';
import Footer            from '@/components/Footer';
import FloatingCTA       from '@/components/FloatingCTA';

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let rafId: number;
    const init = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.85,
        }) as unknown as { raf: (t: number) => void; destroy: () => void };

        // Connect Lenis to GSAP ScrollTrigger
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        const { default: gsap } = await import('gsap');
        gsap.registerPlugin(ScrollTrigger);
        (lenis as any).on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time: number) => lenis!.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      } catch {
        // fallback to native scroll
        const raf = (t: number) => { lenis?.raf(t); rafId = requestAnimationFrame(raf); };
        rafId = requestAnimationFrame(raf);
      }
    };
    init();
    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);
  return <>{children}</>;
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <MagneticCursor />
      <FloatingCTA />
      <SmoothScroll>
        <main
          className="transition-opacity duration-700"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <Navbar />
          <Hero />
          <About />
          <Services />
          <Properties />
          <Stats />
          <ScrollStory />
          <DubaiSection />
          <Investment />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
