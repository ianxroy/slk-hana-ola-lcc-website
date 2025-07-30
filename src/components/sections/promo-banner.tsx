
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
import { GsapScrollAnimator } from "../animations/gsap-scroll-animator";

// Mock Data for Promo Banners
const mockBanners = [
  {
    id: "1",
    title: "Now Hiring Caregivers!",
    description: "Join our team and make a difference in your community.",
    cta: "Apply Now",
    ctaLink: "/employment",
    badge: "Careers",
    badgeVariant: "secondary",
  },
  {
    id: "2",
    title: "Free In-Home Consultation",
    description:
      "Contact us today to schedule a free, no-obligation consultation.",
    cta: "Contact Us",
    ctaLink: "/contact",
    badge: "Limited Time Offer",
    badgeVariant: "default",
  },
  {
    id: "3",
    title: "BBB Accredited Business",
    description: "We are proud to be a BBB accredited business with an A+ rating.",
    cta: "Learn More",
    ctaLink: "https://www.bbb.org/us/hi/waipahu/profile/home-care/slk-hana-ola-llc-1296-1000152785#sealclick",
    badge: "Trusted",
    badgeVariant: "destructive",
  }
];

export function PromoBanner() {
  return (
    <section
      id="promo-banner"
      className="w-full bg-primary/20"
      aria-labelledby="promo-banner-heading"
    >
      <GsapScrollAnimator>
        <div className="container mx-auto px-4 md:px-6">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              {mockBanners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="flex flex-col items-center justify-center space-y-2 py-4 text-center md:flex-row md:space-x-8 md:space-y-0 animate-fade-in-up">
                    <Badge variant={banner.badgeVariant as any}>
                      {banner.badge}
                    </Badge>
                    <div className="text-center md:text-left">
                      <h3 className="text-sm font-bold md:text-base">
                        {banner.title}
                      </h3>
                      <p className="text-xs text-foreground/80 md:text-sm">
                        {banner.description}
                      </p>
                    </div>
                    <Button asChild size="sm" variant="outline">
                        <Link href={banner.ctaLink} target={banner.ctaLink.startsWith('http') ? '_blank' : '_self'}>{banner.cta}</Link>
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </GsapScrollAnimator>
    </section>
  );
}
