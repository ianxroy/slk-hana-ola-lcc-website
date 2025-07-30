import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GsapScrollAnimator } from "../animations/gsap-scroll-animator";
import Link from "next/link";

type EmploymentSectionProps = {
    isPreview?: boolean;
};

export function EmploymentSection({ isPreview = false }: EmploymentSectionProps) {
    return (
        <section id="employment" className="w-full bg-secondary/20 py-12 md:py-24">
            <GsapScrollAnimator>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        <div className="order-2 lg:order-1 space-y-6">
                            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl scroll-animate">
                                Join Our Team
                            </h2>
                            <p className="max-w-2xl text-lg text-foreground/80 md:text-xl scroll-animate">
                                We are always looking for passionate and dedicated individuals to join the SLK Hana Ola family. If you share our commitment to compassionate care, we would love to hear from you.
                            </p>
                            <div className="scroll-animate">
                               <Button asChild size="lg" className="hover:bg-yellow-orange">
                                   <Link href="/employment">View Open Positions</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 overflow-hidden rounded-xl shadow-2xl">
                            <Image
                                src="https://placehold.co/600x400.png"
                                alt="Diverse team of healthcare professionals"
                                width={600}
                                height={400}
                                className="h-full w-full object-cover"
                                data-ai-hint="medical team"
                            />
                        </div>
                    </div>
                </div>
            </GsapScrollAnimator>
        </section>
    );
}
