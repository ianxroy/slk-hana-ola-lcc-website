
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

// Mock Data for Promo Banners
const mockBanners = [
  {
    id: "1",
    title: "Now Hiring Caregivers!",
    description: "Join our team and make a difference in your community. We offer competitive pay and flexible schedules.",
    cta: "Apply Now",
    ctaLink: "/employment",
    badge: "Careers",
    badgeVariant: "secondary",
    image: "https://placehold.co/600x400.png",
    imageHint: "caregiver helping elderly"
  },
  {
    id: "2",
    title: "Free In-Home Consultation",
    description:
      "Discover how we can help your loved ones live comfortably and safely at home. Contact us today to schedule a free, no-obligation consultation.",
    cta: "Contact Us",
    ctaLink: "/contact",
    badge: "Limited Time Offer",
    badgeVariant: "default",
    image: "https://placehold.co/600x400.png",
    imageHint: "friendly consultation"
  },
  {
    id: "3",
    title: "BBB Accredited Business",
    description: "We are proud to be a BBB accredited business with an A+ rating, reflecting our commitment to trust and quality care.",
    cta: "Learn More",
    ctaLink: "https://www.bbb.org/us/hi/waipahu/profile/home-care/slk-hana-ola-llc-1296-1000152785#sealclick",
    badge: "Trusted",
    badgeVariant: "destructive",
    image: "https://placehold.co/600x400.png",
    imageHint: "quality seal"
  }
];

export function PromoBanner() {
  return (
    <section
      id="promo-banner"
      className="w-full bg-primary/10 py-8 md:py-12"
      aria-labelledby="promo-banner-heading"
    >
        <div className="container mx-auto px-4 md:px-6">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
          >
            <CarouselContent>
              {mockBanners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
                    <div className="space-y-4 text-center md:text-left">
                        <Badge variant={banner.badgeVariant as any}>
                          {banner.badge}
                        </Badge>
                        <h3 className="font-headline text-2xl md:text-3xl font-bold">
                            {banner.title}
                        </h3>
                        <p className="text-base md:text-lg text-foreground/80">
                            {banner.description}
                        </p>
                        <Button asChild size="lg" className="mt-4">
                            <Link href={banner.ctaLink} target={banner.ctaLink.startsWith('http') ? '_blank' : '_self'}>{banner.cta}</Link>
                        </Button>
                    </div>
                    <div className="group overflow-hidden rounded-lg shadow-lg">
                       <Image
                        src={banner.image}
                        alt={banner.title}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={banner.imageHint}
                       />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
    </section>
  );
}
