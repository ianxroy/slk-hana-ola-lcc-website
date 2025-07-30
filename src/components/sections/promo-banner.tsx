"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

// Sample data for promotions. In a real application, this would come from a CMS or database.
const promotions = [
  {
    id: 1,
    title: "Summer Special: 10% Off All Services",
    description: "Book any home care service this summer and receive a 10% discount. Limited time offer!",
    imageUrl: "https://placehold.co/1200x300.png",
    imageHint: "summer sale",
    link: "#services",
  },
  {
    id: 2,
    title: "Refer a Friend, Get a $50 Credit",
    description: "Refer a new client to us and you'll both receive a $50 credit towards future services.",
    imageUrl: "https://placehold.co/1200x300.png",
    imageHint: "friends sharing",
    link: "#contact",
  },
];

export function PromoBanner() {
  if (promotions.length === 0) {
    return null;
  }

  return (
    <section id="promo-banner" className="w-full bg-accent text-accent-foreground py-4">
      <div className="container mx-auto px-4 md:px-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
           plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {promotions.map((promo) => (
              <CarouselItem key={promo.id}>
                <a href={promo.link}>
                  <Card className="border-none bg-transparent shadow-none">
                    <CardContent className="relative flex aspect-[4/1] items-center justify-center p-0">
                      <Image
                        src={promo.imageUrl}
                        alt={promo.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        data-ai-hint={promo.imageHint}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/50 p-6 text-center text-white">
                        <h3 className="font-headline text-2xl font-bold md:text-3xl">
                          {promo.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm md:text-base">
                          {promo.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white" />
        </Carousel>
      </div>
    </section>
  );
}
