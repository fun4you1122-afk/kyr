import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ServicesSection } from '@/components/ServicesSection';
import { PropertyCatalogueSection } from '@/components/PropertyCatalogueSection';
import { RegisterBanner } from '@/components/RegisterBanner';
import FoundersSection from '@/components/FoundersSection';
import { InvestSection } from '@/components/InvestSection';
import { QuoteSection } from '@/components/QuoteSection';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <PropertyCatalogueSection />
        <RegisterBanner />
        <FoundersSection />
        <InvestSection />
        <QuoteSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
