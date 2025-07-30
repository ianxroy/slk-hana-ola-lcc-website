import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
    return (
        <section id="contact" className="scroll-animate w-full py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
                    <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Contact Us</h2>
                    <p className="text-xl text-foreground/70">
                        Have questions? We're here to help. Reach out to us anytime.
                    </p>
                </div>
                <div className="mx-auto max-w-xl">
                    <form className="grid gap-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-lg">Name</Label>
                                <Input id="name" placeholder="Your Name" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email" className="text-lg">Email</Label>
                                <Input id="email" type="email" placeholder="your.email@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-lg">Message</Label>
                            <Textarea id="message" placeholder="Your message..." rows={5} />
                        </div>
                        <Button type="submit" size="lg" className="w-full hover:bg-yellow-orange text-lg">Send Message</Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
