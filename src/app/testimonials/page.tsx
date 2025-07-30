import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TestimonialsSection } from '@/components/sections/testimonials';

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
