import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type EmploymentSectionProps = {
    isPreview?: boolean;
};

export function EmploymentSection({ isPreview = false }: EmploymentSectionProps) {
    return (
        <section id="employment" className="w-full bg-secondary/20 py-12 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="order-2 lg:order-1 space-y-6">
                        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in-up">
                            Join Our Team
                        </h2>
                        <p className="max-w-2xl text-lg text-foreground/80 md:text-xl animate-fade-in-up">
                            We are always looking for passionate and dedicated individuals to join the SLK Hana Ola family. If you share our commitment to compassionate care, we would love to hear from you.
                        </p>
                        <div className="animate-fade-in-up">
                           <Button asChild size="lg">
                               <Link href="/employment">View Open Positions</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 overflow-hidden rounded-xl shadow-2xl">
                        <Image
                            src="/images/be_a_caregiver.jpg"
                            alt="Diverse team of healthcare professionals"
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                            unoptimized
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
