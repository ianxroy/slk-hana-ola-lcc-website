import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="home" className="scroll-animate w-full bg-light-green/20">
      <div className="container mx-auto px-4 py-20 md:px-6 lg:py-32">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              PROVIDING THE HIGHEST QUALITY HEALTHCARE AT HOME
            </h1>
            <p className="max-w-2xl text-lg text-foreground/80 md:text-xl">
              SLK Hana Ola provides exceptional healthcare services with a personal touch. We are dedicated to the well-being of our community, one patient at a time.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="hover:bg-yellow-orange">
                <Link href="#about">Learn More About Us</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="#services">Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Compassionate healthcare provider with a patient"
              width={600}
              height={400}
              className="h-full w-full object-cover"
              data-ai-hint="healthcare worker patient"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
