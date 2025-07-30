import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { ServicesSection } from '@/components/sections/services';
import { EmploymentSection } from '@/components/sections/employment';
import { ContactSection } from '@/components/sections/contact';
import { GsapScrollAnimator } from '@/components/animations/gsap-scroll-animator';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GsapScrollAnimator>
          <HeroSection />
          <div className="w-full bg-gradient-to-b from-background via-light-green/10 to-background">
            <AboutSection />
            <ServicesSection />
          </div>
          <EmploymentSection />
          <ContactSection />
        </GsapScrollAnimator>
      </main>
      <Footer />
    </div>
  );
}
