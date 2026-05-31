'use client';

import dynamic from 'next/dynamic';
import { WebGLBackground }  from '@/components/WebGLBackground';
import { Loader }            from '@/components/Loader';
import { CustomCursor }      from '@/components/CustomCursor';
import { Navbar }            from '@/components/Navbar';
import { Hero }              from '@/components/Hero';
import { MarqueeBand }       from '@/components/MarqueeBand';
import { AboutSection }      from '@/components/AboutSection';
import { ServicesSection }   from '@/components/ServicesSection';
import { GallerySection }    from '@/components/GallerySection';
import { AdvantageSection }  from '@/components/AdvantageSection';
import { FoundersSection }   from '@/components/FoundersSection';
import { InvestSection }              from '@/components/InvestSection';
import { PropertyCatalogueSection }  from '@/components/PropertyCatalogueSection';
import { QuoteSection }              from '@/components/QuoteSection';
import { ContactSection }            from '@/components/ContactSection';
import { FooterSection }             from '@/components/FooterSection';

const GSAPAnimations      = dynamic(() => import('@/components/GSAPAnimations'),      { ssr: false });
const CatalogueAnimations = dynamic(() => import('@/components/CatalogueAnimations'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* ── Fixed background layers ── */}
      <WebGLBackground />
      <div className="hero-media" id="heroMedia">
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/KYR.mp4" type="video/mp4" />
          <source src="https://www.kyr.ae/hero-index-20260312.mp4" type="video/mp4" />
        </video>
        <div className="hero-media__veil" />
      </div>
      <div className="atmos" />
      <div className="vignette" />
      <div className="grain" />

      {/* ── UI overlays ── */}
      <div className="progress"><span id="progressBar" /></div>
      <CustomCursor />
      <Loader />

      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Page content ── */}
      <span id="top" />
      <Hero />
      <MarqueeBand />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <AdvantageSection />
      <FoundersSection />
      <InvestSection />
      <PropertyCatalogueSection />
      <QuoteSection />
      <ContactSection />
      <FooterSection />

      {/* ── GSAP + Three.js init (client-only) ── */}
      <GSAPAnimations />
      <CatalogueAnimations />
    </>
  );
}
