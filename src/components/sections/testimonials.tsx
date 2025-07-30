
"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { GsapScrollAnimator } from "../animations/gsap-scroll-animator";

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
          // Don't show toast to avoid bothering non-admin users
        } finally {
          setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTestimonials();
    }, [fetchTestimonials]);

    const displayedTestimonials = isPreview ? testimonials.slice(0, 3) : testimonials;

    return (
        <section id="testimonials" className="w-full bg-background py-12 md:py-24">
            <GsapScrollAnimator key={isLoading ? 'loading' : 'loaded'}>
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
                        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-48 w-full" />
                        </div>
                    ) : (
                        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3 stagger-container">
                            {displayedTestimonials.map((testimonial) => (
                                <Card 
                                    key={testimonial.id} 
                                    className={cn(
                                        "flex flex-col justify-between overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl animate-fade-in-up",
                                        testimonial.rating === 5 && "five-star-glow"
                                    )}
                                >
                                    <CardHeader className="flex-row items-center gap-4 pb-4">
                                        <Avatar>
                                            <AvatarImage src={testimonial.image} />
                                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg font-bold animate-text-reveal">{testimonial.name}</CardTitle>
                                            <div className="flex items-center gap-0.5">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`star h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-base italic animate-fade-in-up">"{testimonial.quote}"</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {isPreview && !isLoading && (
                        <div className="text-center mt-12 animate-fade-in-up">
                            <Button asChild size="lg">
                                <Link href="/testimonials">Read More Testimonials</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </GsapScrollAnimator>
        </section>
    );
}
