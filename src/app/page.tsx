import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { ServicesSection } from '@/components/sections/services';
import { EmploymentSection } from '@/components/sections/employment';
import { ContactSection } from '@/components/sections/contact';
import { GsapScrollAnimator } from '@/components/animations/gsap-scroll-animator';
import { TestimonialsSection } from '@/components/sections/testimonials';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GsapScrollAnimator>
          <HeroSection />
          <AboutSection isPreview />
          <ServicesSection />
          <TestimonialsSection isPreview />
          <EmploymentSection isPreview />
          <ContactSection isPreview />
        </GsapScrollAnimator>
      </main>
      <Footer />
    </div>
  );
}
