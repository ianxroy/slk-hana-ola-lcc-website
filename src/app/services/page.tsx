import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ServicesSection } from '@/components/sections/services';
import { GsapScrollAnimator } from '@/components/animations/gsap-scroll-animator';

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GsapScrollAnimator>
          <ServicesSection />
        </GsapScrollAnimator>
      </main>
      <Footer />
    </div>
  );
}
