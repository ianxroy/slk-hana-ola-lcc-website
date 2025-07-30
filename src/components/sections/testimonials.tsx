import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const testimonials = [
  {
    name: "John D.",
    avatar: "JD",
    rating: 5,
    quote: "SLK Hana Ola has been a blessing for our family. The caregivers are compassionate, professional, and have taken wonderful care of my mother.",
    imageHint: "happy senior man"
  },
  {
    name: "Sarah P.",
    avatar: "SP",
    rating: 5,
    quote: "The team at SLK Hana Ola is incredibly reliable and attentive. I can finally have peace of mind knowing my father is in good hands.",
     imageHint: "smiling woman"
  },
  {
    name: "Mike R.",
    avatar: "MR",
    rating: 5,
    quote: "Their personalized care plan was exactly what we needed. The staff is friendly and always goes the extra mile. Highly recommended!",
    imageHint: "content person"
  }
];

type TestimonialsSectionProps = {
    isPreview?: boolean;
};

export function TestimonialsSection({ isPreview = false }: TestimonialsSectionProps) {
    const displayedTestimonials = isPreview ? testimonials.slice(0, 3) : testimonials;

  return (
    <section id="testimonials" className="w-full bg-accent/10 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in-up">What Our Clients Say</h2>
          <p className="text-lg text-foreground/80 animate-fade-in-up">
              Real stories from families we've had the privilege to serve.
          </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {displayedTestimonials.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col justify-between overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl animate-fade-in-up">
              <CardHeader className="flex-row items-center gap-4 pb-4">
                  <Avatar>
                  <AvatarImage src={`https://placehold.co/40x40.png?text=${testimonial.avatar}`} data-ai-hint={testimonial.imageHint} />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                  <CardTitle className="text-lg font-bold animate-fade-in-up">{testimonial.name}</CardTitle>
                  <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
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
