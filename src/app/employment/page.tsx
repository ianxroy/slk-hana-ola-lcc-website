import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmploymentSection } from '@/components/sections/employment';
import { GsapScrollAnimator } from '@/components/animations/gsap-scroll-animator';

export default function EmploymentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <GsapScrollAnimator>
          <EmploymentSection />
        </GsapScrollAnimator>
      </main>
      <Footer />
    </div>
  );
}
