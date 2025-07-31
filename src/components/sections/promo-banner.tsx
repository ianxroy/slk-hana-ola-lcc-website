
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";

// Mock Data for Promo Banners
const mockBanners = [
  {
    id: "5",
    title: "We are hiring!",
    description: "We are looking for Male and Female Caregivers and CNA’s who can also drive.",
    cta: "Apply Now",
    ctaLink: "/employment",
    badge: "Careers",
    badgeVariant: "secondary",
    image: "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "job hiring"
  },
  {
    id: "3",
    title: "BBB Accredited Business",
    description: "We are proud to be a BBB accredited business with an A+ rating, reflecting our commitment to trust and quality care.",
    cta: "Learn More",
    ctaLink: "https://www.bbb.org/us/hi/waipahu/profile/home-care/slk-hanaola-llc-1296-1000152785#sealclick",
    badge: "Trusted",
    badgeVariant: "destructive",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0cnVzdGVkfGVufDB8fHx8MTc1Mzk1MDIxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "quality seal"
  },
];

export function PromoBanner() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);


  return (
    <section
      id="promo-banner"
      className="w-full bg-primary/10 py-12 md:py-16"
      aria-labelledby="promo-banner-heading"
    >
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative flex items-center justify-center">
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: true,
                }),
              ]}
              className="group w-full"
            >
              <CarouselContent>
                {mockBanners.map((banner) => {
                  const hasTextContent = banner.title || banner.description || banner.badge;
                  return (
                      <CarouselItem key={banner.id}>
                        <div className={cn(
                          "grid grid-cols-1 items-center gap-8 md:gap-12 h-full",
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
                          <div className={cn(
                            "relative overflow-hidden rounded-lg shadow-lg",
                            !hasTextContent && "col-span-full",
                            "max-h-[300px]"
                          )}>
                            <Link href={banner.ctaLink || '#'} target={banner.ctaLink?.startsWith('http') ? '_blank' : '_self'}>
                              <Image
                                src={banner.image}
                                alt={banner.title || 'Promotional Banner'}
                                width={1200}
                                height={300}
                                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={banner.imageHint}
                              />
                            </Link>
                          </div>
                        </div>
                      </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
           <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                        "h-2 w-2 rounded-full transition-colors",
                        current === index + 1 ? "bg-primary" : "bg-primary/30"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
        </div>
    </section>
  );
}
