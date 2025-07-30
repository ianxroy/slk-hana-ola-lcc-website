import { Logo } from '@/components/logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer id="footer" className="bg-accent text-accent-foreground h-screen snap-start flex flex-col justify-center">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo />
          <p className="text-center text-base md:text-left">
            &copy; {new Date().getFullYear()} SLK Hana Ola, LLC. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-base hover:underline">Privacy Policy</Link>
            <Link href="#" className="text-base hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
