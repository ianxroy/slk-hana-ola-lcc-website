
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const testimonials = [
  {
    name: "John D.",
    avatar: "JD",
    rating: 5,
    quote: "SLK Hana Ola, LLC has been a blessing for our family. The caregivers are compassionate, professional, and have taken wonderful care of my mother.",
    image: "/images/testimonial_john.jpg",
    imageHint: "happy senior man"
  },
  {
    name: "Sarah P.",
    avatar: "SP",
    rating: 5,
    quote: "The team at SLK Hana Ola, LLC is incredibly reliable and attentive. I can finally have peace of mind knowing my father is in good hands.",
    image: "/images/testimonial_sarah.jpg",
    imageHint: "smiling woman"
  },
  {
    name: "Mike R.",
    avatar: "MR",
    rating: 4,
    quote: "Their personalized care plan was exactly what we needed. The staff is friendly and always goes the extra mile. Highly recommended!",
    image: "/images/testimonial_mike.jpg",
    imageHint: "content person"
  },
  {
    name: "Dan and June",
    avatar: "DJ",
    rating: 5,
    quote: "Home health aide staff were skillful, both professionally and personally. Company management was very prompt in response to scheduling requests and in providing documents for insurance claims. I would retain the company again.",
    image: "https://placehold.co/100x100.png",
    imageHint: "happy couple"
  }
];

type TestimonialsSectionProps = {
    isPreview?: boolean;
};

export function TestimonialsSection({ isPreview = false }: TestimonialsSectionProps) {
    const displayedTestimonials = isPreview ? testimonials.slice(0, 3) : testimonials;

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
          <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 stagger-container">
          {displayedTestimonials.map((testimonial) => (
              <Card 
                key={testimonial.name} 
                className={cn(
                    "flex flex-col justify-between overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl animate-fade-in-up",
                    testimonial.rating === 5 && "five-star-glow"
                )}
              >
              <CardHeader className="flex-row items-center gap-4 pb-4">
                  <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
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
          {isPreview && (
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
