'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Properties from '@/components/Properties';
import Stats from '@/components/Stats';
import DubaiSection from '@/components/DubaiSection';
import VideoShowcase from '@/components/VideoShowcase';
import Investment from '@/components/Investment';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let rafId: number;

    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.8,
        }) as unknown as { raf: (t: number) => void; destroy: () => void };

        const raf = (time: number) => {
          lenis!.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch (e) {
        // Lenis failed to load, fall back to native scroll
      }
    };

    initLenis();
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
      <CustomCursor />
      <SmoothScrollProvider>
        <main className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <Navbar />
          <Hero />
          <About />
          <Services />
          <Properties />
          <Stats />
          <VideoShowcase />
          <DubaiSection />
          <Investment />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </SmoothScrollProvider>
    </>
  );
}
