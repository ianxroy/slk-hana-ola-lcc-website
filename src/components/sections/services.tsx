
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
            image: "https://images.unsplash.com/photo-1551821719-b1e457588349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMGh5Z2llbmV8ZW58MHx8fHwxNzUzOTUyMDM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
            imageHint: "personal hygiene"
        },
        {
            title: "Homemaker Services",
            description: "Homemaker services shall be provided by personal care aides or homemakers and shall include activities based on the assessment of the clients’ needs, including but not limited to: routine and light house cleaning; care of clothing and linens; shopping for household supplies; clothing and personal essentials; running errands or picking up medication; shopping for food or preparing meals; escorting the client to medical care services or to nutritional or recreational programs; and assisting with simple health care routines such as reminders to take oral medication; to maintain diet restrictions or to perform recommended exercises.",
            image: "https://images.unsplash.com/photo-1625489409904-324a5e9591e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxob21lbWFrZXIlMjBzZXJ2aWNlc3xlbnwwfHx8fDE3NTM5NTE4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
            imageHint: "clean house"
        },
        {
            title: "Assistance With Daily Living",
            description: "We provide support with daily activities to help our clients maintain their independence and quality of life at home.",
            image: "https://images.unsplash.com/photo-1723433892471-62f113c8c9a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhc3Npc3RhbmNlJTIwd2l0aCUyMGRhaWx5JTIwbGl2aW5nfGVufDB8fHx8MTc1Mzk1MTg2OXww&ixlib=rb-4.1.0&q=80&w=1080",
            imageHint: "helping elderly"
        },
        {
            title: "Companionship",
            description: "Our caregivers offer companionship and emotional support, engaging in activities that our clients enjoy and ensuring they feel connected.",
            image: "https://images.unsplash.com/photo-1461532257246-777de18cd58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb21wYW5pb25zaGlwfGVufDB8fHx8MTc1Mzk1MTg4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
            imageHint: "happy friends"
        }
    ];

    const displayedServices = isPreview ? services.slice(0, 2) : services;

    return (
        <section id="services" className="w-full bg-accent/10 py-12 md:py-24">
             <GsapScrollAnimator>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
                        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-text-reveal">Our Services</h2>
                        <p className="text-lg text-foreground/80 animate-fade-in-up">
                            Because we are committed to your good health...
                        </p>
                        <p className="text-base text-foreground/80 animate-fade-in-up">
                            SLK Hana Ola, LLC offers the following services regardless of race, age, color, creed, sex, national origin, ancestry, religion, disability, marital status or sexual orientation.
                        </p>
                    </div>
                    <div className="mx-auto max-w-6xl">
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
                                        <CardTitle className="font-headline text-2xl font-bold text-secondary pt-4 animate-text-reveal">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-base animate-fade-in-up">{service.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                         <p className="text-xl font-bold text-primary pt-6 animate-fade-in-up">
                            OUR PROFESSIONAL TEAM IS READY TO ASSIST AND PROVIDE EXCEPTIONAL SERVICES
                       </p>
                       {isPreview && (
                           <div className="text-center mt-8 animate-fade-in-up">
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
