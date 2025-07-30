
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-center text-white snap-start bg-cover bg-center"
      style={{ backgroundImage: "url('/images/main_banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 py-20 md:px-6 lg:py-24">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl animate-fade-in-up">
          PROVIDING THE HIGHEST QUALITY HEALTHCARE AT HOME
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-white/90 md:text-xl animate-fade-in-up">
          SLK Hana Ola, LLC provides exceptional healthcare services with a personal touch. We are dedicated to the well-being of our community, one patient at a time.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-in-up">
          <Button asChild size="lg">
            <Link href="/about">Learn More About Us</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#services">Our Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
