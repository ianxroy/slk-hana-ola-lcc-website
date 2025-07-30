
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import React from 'react';
import { GsapScrollAnimator } from "../animations/gsap-scroll-animator";
import Link from "next/link";
import { submitContactForm } from "@/ai/flows/contact-flow";
import { ContactFormInputSchema } from "@/ai/flows/contact-schema";
import { Loader2 } from "lucide-react";

type ContactSectionProps = {
    isPreview?: boolean;
};

export function ContactSection({ isPreview = false }: ContactSectionProps) {
    const [isClient, setIsClient] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    React.useEffect(() => {
        setIsClient(true);
    }, []);
    
  const form = useForm<z.infer<typeof ContactFormInputSchema>>({
    resolver: zodResolver(ContactFormInputSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof ContactFormInputSchema>) {
    setIsSubmitting(true);
    try {
        const result = await submitContactForm(data);
        if (result.success) {
            toast({
                title: "Form Submitted!",
                description: "Thank you for your message. We will get back to you shortly.",
            });
            form.reset();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was an error submitting your form. Please try again later.",
        });
        console.error("Form submission error:", error);
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="w-full bg-background py-12 md:py-24"
    >
        <GsapScrollAnimator>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="text-center lg:text-left">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl scroll-animate">
                Contact Us
              </h2>
              <p className="mt-4 text-foreground/80 scroll-animate">
                To better serve you, please provide SLK Hana Ola, LLC with the
                following information and we'll get back to you promptly.
              </p>
            </div>
            <div className="w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
              {apiKey ? (
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=94-1161+HeaHea+Street,Waipahu,HI+96797`}
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                  Google Maps API Key is missing.
                </div>
              )}
            </div>
          </div>
          <div className="mx-auto w-full max-w-md">
            {isClient && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>I am interested in more information about: *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="services" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Home Care Services
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="employment" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Employment Opportunities
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How can we best help you? *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full hover:bg-yellow-orange" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                 {isPreview && (
                    <div className="text-center mt-4">
                        <p className="text-sm text-foreground/80">Or view our full <Link href="/contact" className="underline hover:text-primary">contact page</Link>.</p>
                    </div>
                )}
              </form>
            </Form>
            )}
          </div>
        </div>
      </div>
      </GsapScrollAnimator>
    </section>
  );
}
