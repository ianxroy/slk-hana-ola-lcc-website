import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmploymentSection } from '@/components/sections/employment';

export default function EmploymentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <EmploymentSection />
      </main>
      <Footer />
    </div>
  );
}
