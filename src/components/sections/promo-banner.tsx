
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
import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from "@/lib/firebase";
import { Skeleton } from "../ui/skeleton";

interface Promotion {
  id: string;
  title?: string;
  description?: string;
  imageUrl: string;
  link: string;
  createdAt: Timestamp;
}

export function PromoBanner() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPromos = useCallback(async () => {
    setIsLoading(true);
    try {
      const promosCollection = collection(db, 'promotions');
      const q = query(promosCollection, orderBy('createdAt', 'desc'));
      const promoSnapshot = await getDocs(q);
      const promosList = promoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Promotion));
      setPromotions(promosList);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      // Not showing a toast here to avoid bothering users
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPromos();
  }, [fetchPromos]);
  
  if (isLoading) {
      return (
          <section id="promo-banner" className="w-full bg-accent text-accent-foreground py-4">
            <div className="container mx-auto px-4 md:px-6">
                <Skeleton className="h-[150px] md:h-[200px] w-full" />
            </div>
        </section>
      )
  }

  if (promotions.length === 0) {
    return null; // Don't render anything if there are no promotions
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
                    <CardContent className="relative flex aspect-video md:aspect-[4/1] items-center justify-center p-0">
                      <Image
                        src={promo.imageUrl}
                        alt={promo.title || 'Promotion'}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/50 p-6 text-center text-white">
                        {promo.title && <h3 className="font-headline text-2xl font-bold md:text-3xl">
                          {promo.title}
                        </h3>}
                        {promo.description && <p className="mt-2 max-w-2xl text-sm md:text-base">
                          {promo.description}
                        </p>}
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
