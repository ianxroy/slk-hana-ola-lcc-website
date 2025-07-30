import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AboutSection } from '@/components/sections/about';
import { GsapScrollAnimator } from '@/components/animations/gsap-scroll-animator';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GsapScrollAnimator>
          <AboutSection />
        </GsapScrollAnimator>
      </main>
      <Footer />
    </div>
  );
}
