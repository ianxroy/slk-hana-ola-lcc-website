import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function ServicesSection() {
    return (
        <section id="services" className="scroll-animate w-full py-16 md:py-24">
             <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
                    <p className="text-lg text-foreground/80">
                        Because we are committed to your good health...
                    </p>
                    <p className="text-base text-foreground/80">
                        SLK Hana Ola, LLC offers the following services regardless of race, age, color, creed, sex, national origin, ancestry, religion, disability, marital status or sexual orientation.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                    <Card className="flex flex-col group overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl">
                        <CardHeader>
                             <div className="overflow-hidden rounded-t-lg">
                                <Image 
                                    src="https://placehold.co/600x400.png"
                                    alt="Personal Care Services"
                                    width={600}
                                    height={400}
                                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint="personal hygiene"
                                />
                            </div>
                            <CardTitle className="font-headline text-2xl font-bold text-secondary pt-4">Personal Care Services</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-base">Personal care services shall include activities based on the assessment of the clients’ needs, including but not limited to: personal hygiene and grooming; bathing; skin care; oral hygiene; hair care; dressing; assistance with ambulation, mobility, transfers, and positioning; and assistance with exercise and range of motion.</p>
                        </CardContent>
                    </Card>
                     <Card className="flex flex-col group overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl">
                        <CardHeader>
                             <div className="overflow-hidden rounded-t-lg">
                                <Image 
                                    src="https://placehold.co/600x400.png"
                                    alt="Homemaker Services"
                                    width={600}
                                    height={400}
                                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint="clean house"
                                />
                            </div>
                            <CardTitle className="font-headline text-2xl font-bold text-secondary pt-4">Homemaker Services</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-base">Homemaker services shall be provided by personal care aides or homemakers and shall include activities based on the assessment of the clients’ needs, including but not limited to: routine and light house cleaning; care of clothing and linens; shopping for household supplies; clothing and personal essentials; running errands or picking up medication; shopping for food or preparing meals; escorting the client to medical care services or to nutritional or recreational programs; and assisting with simple health care routines such as reminders to take oral medication; to maintain diet restrictions or to perform recommended exercises.</p>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col group overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl">
                        <CardHeader>
                             <div className="overflow-hidden rounded-t-lg">
                                <Image 
                                    src="https://placehold.co/600x400.png"
                                    alt="Assistance with daily living"
                                    width={600}
                                    height={400}
                                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint="helping elderly"
                                />
                            </div>
                            <CardTitle className="font-headline text-2xl font-bold text-secondary pt-4">Assistance With Daily Living</CardTitle>
                        </CardHeader>
                         <CardContent className="flex-grow">
                            <p className="text-base">We provide support with daily activities to help our clients maintain their independence and quality of life at home.</p>
                        </CardContent>
                    </Card>
                     <Card className="flex flex-col group overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl">
                        <CardHeader>
                            <div className="overflow-hidden rounded-t-lg">
                                <Image 
                                    src="https://placehold.co/600x400.png"
                                    alt="Companionship"
                                    width={600}
                                    height={400}
                                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint="happy friends"
                                />
                            </div>
                            <CardTitle className="font-headline text-2xl font-bold text-secondary pt-4">Companionship</CardTitle>
                        </CardHeader>
                         <CardContent className="flex-grow">
                            <p className="text-base">Our caregivers offer companionship and emotional support, engaging in activities that our clients enjoy and ensuring they feel connected.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="mt-12 text-center">
                     <p className="text-xl font-bold text-primary pt-6">
                        OUR PROFESSIONAL TEAM IS READY TO ASSIST AND PROVIDE EXCEPTIONAL SERVICES
                   </p>
                </div>
            </div>
        </section>
    )
}
