import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen snap-start w-full bg-light-green/20 flex flex-col items-center justify-center py-12 md:py-24">
      <div className="container mx-auto flex flex-col items-center px-4 py-20 text-center md:px-6 lg:py-24">
        <div className="relative w-full max-w-4xl">
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <Image
              src="/images/main_banner.jpg"
              alt="Compassionate healthcare provider with a patient"
              width={1200}
              height={600}
              className="h-full w-full object-cover"
              unoptimized
              priority
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/60 p-6">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl animate-fade-in-up">
              PROVIDING THE HIGHEST QUALITY HEALTHCARE AT HOME
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/90 md:text-xl animate-fade-in-up">
              SLK Hana Ola, LLC provides exceptional healthcare services with a personal touch. We are dedicated to the well-being of our community, one patient at a time.
            </p>
          </div>
        </div>
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
