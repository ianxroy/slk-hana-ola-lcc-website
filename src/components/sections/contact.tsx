
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
import { Loader2 } from "lucide-react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ContactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  interest: z.enum(['services', 'employment'], {
    required_error: "You need to select an interest.",
  }),
  message: z.string().min(1, { message: "Message is required." }),
});

type ContactSectionProps = {
    isPreview?: boolean;
};

export function ContactSection({ isPreview = false }: ContactSectionProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const form = useForm<z.infer<typeof ContactFormSchema>>({
        resolver: zodResolver(ContactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    const { toast } = useToast();

    async function onSubmit(data: z.infer<typeof ContactFormSchema>) {
        if (!executeRecaptcha) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "reCAPTCHA not ready. Please try again.",
            });
            return;
        }

        setIsSubmitting(true);
        const token = await executeRecaptcha('contactForm');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, token }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "An unexpected error occurred.");
            }

            toast({
                title: "Form Submitted!",
                description: "Thank you for your message. We will get back to you shortly.",
            });
            form.reset();
        } catch (error: any) {
            console.error('Submission error:', error);
            toast({
                variant: "destructive",
                title: "Error!",
                description: error.message || "There was a problem sending your message. Please try again.",
            });
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
                        </div>
                    </div>
                </div>
            </GsapScrollAnimator>
        </section>
    );
};
