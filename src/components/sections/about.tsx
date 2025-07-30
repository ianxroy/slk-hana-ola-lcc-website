import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type AboutSectionProps = {
  isPreview?: boolean;
};

export function AboutSection({ isPreview = false }: AboutSectionProps) {
    return (
        <section id="about" className="w-full bg-background py-12 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center space-y-4">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-text-reveal">About SLK Hana Ola, LLC</h2>
                    <p className="text-lg font-semibold text-primary animate-fade-in-up">TO PROMOTE, PROTECT AND ADVANCE THE HIGHEST QUALITY HEALTHCARE AT HOME</p>
                </div>
                <div className="mt-12 text-base text-foreground/80 text-center max-w-4xl mx-auto space-y-8">
                   <div className="text-lg space-y-4">
                       <p className="font-bold text-xl text-secondary animate-fade-in-up">Because we are committed to your good health...</p>
                       <p className="animate-fade-in-up">
                            SLK Hana Ola, LLC is a newly established home care agency that primarily engages in various personal care and homemaker services in the clients' residences. With our team of caregivers, we make sure that our clients receive top-notch care in their homes.
                       </p>
                       {!isPreview && (
                        <>
                            <p className="animate-fade-in-up">
                                    We envision the company to diversify in the future and provide skilled nursing services and therapeutic services such as physical therapy and occupational therapy.
                            </p>
                            <p className="animate-fade-in-up">
                                    When you need professional assistance and extra support for your loved one, let SLK Hana Ola, LLC help you.
                            </p>
                            <p className="animate-fade-in-up">
                                    For more inquiries, please contact us at <a href="tel:808-772-4756" className="text-primary hover:underline">808-772-4756</a>.
                            </p>
                        </>
                       )}
                   </div>
                   
                   <div className="mt-12 grid gap-8 md:grid-cols-2">
                        <Card className="group overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl animate-fade-in-up">
                            <CardHeader>
                                <div className="overflow-hidden rounded-t-lg">
                                    <Image 
                                        src="/images/our_mission.jpg"
                                        alt="Our Mission"
                                        width={600}
                                        height={400}
                                        className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        unoptimized
                                    />
                                </div>
                                <CardTitle className="font-headline text-2xl font-bold text-secondary pt-4 animate-text-reveal">OUR MISSION</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-left text-base animate-fade-in-up">To respectfully and compassionately meet the needs of our clients and their families by listening, planning, educating and delivering the highest quality of individualized home healthcare.</p>
                            </CardContent>
                        </Card>
                        <Card className="group overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl animate-fade-in-up">
                             <CardHeader>
                                <div className="overflow-hidden rounded-t-lg">
                                    <Image 
                                        src="/images/our_vision.png"
                                        alt="Our Vision"
                                        width={600}
                                        height={400}
                                        className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        unoptimized
                                    />
                                </div>
                                <CardTitle className="font-headline text-2xl font-bold text-secondary pt-4 animate-text-reveal">OUR VISION</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-left text-base animate-fade-in-up">Our strategic vision is to create and sustain a leading high quality home care service that supports individuals to live as independently as possible in the comfort of their own homes. We personalize our services to meet your situation respectfully, efficiently, and compassionately, fostering independence, preserving dignity and improving quality of life.</p>
                            </CardContent>
                        </Card>
                   </div>

                   <p className="text-xl font-bold text-primary pt-6 animate-fade-in-up">
                    OUR PROFESSIONAL TEAM IS READY TO ASSIST AND PROVIDE EXCEPTIONAL SERVICES
                   </p>
                    {isPreview && (
                        <div className="text-center mt-8 animate-fade-in-up">
                            <Button asChild size="lg">
                                <Link href="/about">Learn More About Us</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
