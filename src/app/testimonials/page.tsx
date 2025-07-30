import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { GsapScrollAnimator } from '@/components/animations/gsap-scroll-animator';

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GsapScrollAnimator>
          <TestimonialsSection />
        </GsapScrollAnimator>
      </main>
      <Footer />
    </div>
  );
}
