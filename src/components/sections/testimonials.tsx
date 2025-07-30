
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from "@/lib/firebase";
import { Skeleton } from "../ui/skeleton";

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  image?: string;
  createdAt: Timestamp;
}

type TestimonialsSectionProps = {
    isPreview?: boolean;
};

export function TestimonialsSection({ isPreview = false }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const testimonialsCollection = collection(db, 'testimonials');
      const q = query(testimonialsCollection, orderBy('createdAt', 'desc'));
      const testimonialSnapshot = await getDocs(q);
      const testimonialsList = testimonialSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
      setTestimonials(testimonialsList);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const displayedTestimonials = isPreview ? testimonials.slice(0, 4) : testimonials;

  return (
    <section id="testimonials" className="w-full bg-background py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-text-reveal">What Our Clients Say</h2>
          <p className="text-lg text-foreground/80 animate-fade-in-up">
              Real stories from families we've had the privilege to serve.
          </p>
           <div className="pt-4 inline-block animate-fade-in-up">
              <a href="https://www.bbb.org/us/hi/waipahu/profile/home-care/slk-hana-ola-llc-1296-1000152785#sealclick" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/bbb_rataing.png" alt="Better Business Bureau Seal" width={200} height={76} unoptimized/>
              </a>
          </div>
          </div>
          
          {isLoading ? (
            <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                ))}
            </div>
          ) : (
            <div className="mt-12 flex flex-wrap justify-center gap-8">
                {displayedTestimonials.map((testimonial) => (
                    <Card 
                        key={testimonial.id} 
                        className={cn(
                            "testimonial-card flex flex-col justify-between overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl w-full md:w-96",
                            testimonial.rating === 5 && "five-star-glow"
                        )}
                    >
                    <CardHeader className="flex-row items-center gap-4 pb-4">
                        <Avatar>
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                        <CardTitle className="text-lg font-bold">{testimonial.name}</CardTitle>
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "star h-5 w-5", 
                                    i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                                )}
                            />
                            ))}
                        </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-base italic">"{testimonial.quote}"</p>
                    </CardContent>
                    </Card>
                ))}
            </div>
          )}
          
          {isPreview && testimonials.length > 4 && (
              <div className="text-center mt-12 animate-fade-in-up">
                  <Button asChild size="lg">
                      <Link href="/testimonials">Read More Testimonials</Link>
                  </Button>
              </div>
          )}
      </div>
    </section>
  );
}
