import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { GsapScrollAnimator } from "../animations/gsap-scroll-animator";
import { Button } from "../ui/button";
import Link from "next/link";

type ServicesSectionProps = {
  isPreview?: boolean;
};

export function ServicesSection({ isPreview = false }: ServicesSectionProps) {
    const services = [
        {
            title: "Personal Care Services",
            description: "Personal care services shall include activities based on the assessment of the clients’ needs, including but not limited to: personal hygiene and grooming; bathing; skin care; oral hygiene; hair care; dressing; assistance with ambulation, mobility, transfers, and positioning; and assistance with exercise and range of motion.",
            image: "https://placehold.co/600x400.png",
            imageHint: "personal hygiene"
        },
        {
            title: "Homemaker Services",
            description: "Homemaker services shall be provided by personal care aides or homemakers and shall include activities based on the assessment of the clients’ needs, including but not limited to: routine and light house cleaning; care of clothing and linens; shopping for household supplies; clothing and personal essentials; running errands or picking up medication; shopping for food or preparing meals; escorting the client to medical care services or to nutritional or recreational programs; and assisting with simple health care routines such as reminders to take oral medication; to maintain diet restrictions or to perform recommended exercises.",
            image: "https://placehold.co/600x400.png",
            imageHint: "clean house"
        },
        {
            title: "Assistance With Daily Living",
            description: "We provide support with daily activities to help our clients maintain their independence and quality of life at home.",
            image: "https://placehold.co/600x400.png",
            imageHint: "helping elderly"
        },
        {
            title: "Companionship",
            description: "Our caregivers offer companionship and emotional support, engaging in activities that our clients enjoy and ensuring they feel connected.",
            image: "https://placehold.co/600x400.png",
            imageHint: "happy friends"
        }
    ];

    const displayedServices = isPreview ? services.slice(0, 2) : services;

    return (
        <section id="services" className="w-full bg-accent/10 py-12 md:py-24">
             <GsapScrollAnimator>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
                        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl scroll-animate">Our Services</h2>
                        <p className="text-lg text-foreground/80 scroll-animate">
                            Because we are committed to your good health...
                        </p>
                        <p className="text-base text-foreground/80 scroll-animate">
                            SLK Hana Ola, LLC offers the following services regardless of race, age, color, creed, sex, national origin, ancestry, religion, disability, marital status or sexual orientation.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 stagger-container">
                        {displayedServices.map((service, index) => (
                            <Card key={index} className="flex flex-col group overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl stagger-card">
                                <CardHeader>
                                     <div className="overflow-hidden rounded-t-lg">
                                        <Image 
                                            src={service.image}
                                            alt={service.title}
                                            width={600}
                                            height={400}
                                            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint={service.imageHint}
                                        />
                                    </div>
                                    <CardTitle className="font-headline text-2xl font-bold text-secondary pt-4 scroll-animate">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-base scroll-animate">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                         <p className="text-xl font-bold text-primary pt-6 scroll-animate">
                            OUR PROFESSIONAL TEAM IS READY TO ASSIST AND PROVIDE EXCEPTIONAL SERVICES
                       </p>
                       {isPreview && (
                           <div className="text-center mt-8 scroll-animate">
                               <Button asChild size="lg" variant="secondary">
                                   <Link href="/services">View All Services</Link>
                               </Button>
                           </div>
                       )}
                    </div>
                </div>
            </GsapScrollAnimator>
        </section>
    )
}
