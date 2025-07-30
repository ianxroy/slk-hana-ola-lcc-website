
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
import { cn } from "@/lib/utils";

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
    image: "https://placehold.co/1200x600.png",
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
    image: "https://placehold.co/1200x600.png",
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
    image: "https://placehold.co/1200x600.png",
    imageHint: "quality seal"
  },
  {
    id: "4",
    image: "https://placehold.co/1200x600.png",
    imageHint: "happy family",
    ctaLink: "/about",
  }
];

export function PromoBanner() {
  return (
    <section
      id="promo-banner"
      className="w-full bg-primary/10 py-12 md:py-16"
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
              {mockBanners.map((banner) => {
                const hasTextContent = banner.title || banner.description || banner.badge;
                return (
                    <CarouselItem key={banner.id}>
                      <div className={cn(
                        "grid grid-cols-1 items-center gap-8 md:gap-12",
                        hasTextContent && "md:grid-cols-2"
                      )}>
                        {hasTextContent && (
                            <div className="space-y-4 text-center md:text-left">
                                {banner.badge && <Badge variant={banner.badgeVariant as any}>{banner.badge}</Badge>}
                                {banner.title && <h3 className="font-headline text-3xl md:text-4xl font-bold">{banner.title}</h3>}
                                {banner.description && <p className="text-lg md:text-xl text-foreground/80">{banner.description}</p>}
                                {banner.cta && banner.ctaLink && (
                                    <Button asChild size="lg" className="mt-4">
                                        <Link href={banner.ctaLink} target={banner.ctaLink.startsWith('http') ? '_blank' : '_self'}>{banner.cta}</Link>
                                    </Button>
                                )}
                            </div>
                        )}
                        <div className="group overflow-hidden rounded-lg shadow-lg max-h-[400px]">
                          <Link href={banner.ctaLink || '#'} target={banner.ctaLink?.startsWith('http') ? '_blank' : '_self'}>
                            <Image
                              src={banner.image}
                              alt={banner.title || 'Promotional Banner'}
                              width={1200}
                              height={600}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              data-ai-hint={banner.imageHint}
                            />
                           </Link>
                        </div>
                      </div>
                    </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </div>
    </section>
  );
}
