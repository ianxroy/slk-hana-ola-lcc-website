import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { ServicesSection } from '@/components/sections/services';
import { EmploymentSection } from '@/components/sections/employment';
import { ContactSection } from '@/components/sections/contact';
import { PromoBanner } from '@/components/sections/promo-banner';
import { TestimonialsSection } from '@/components/sections/testimonials';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <PromoBanner />
      <main className="flex-1">
          <HeroSection />
          <AboutSection isPreview />
          <ServicesSection isPreview />
          <TestimonialsSection isPreview />
          <EmploymentSection isPreview />
          <ContactSection isPreview />
      </main>
      <Footer />
    </div>
  );
}
