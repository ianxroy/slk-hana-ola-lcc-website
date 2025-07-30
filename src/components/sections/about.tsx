import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GsapScrollAnimator } from '@/components/animations/gsap-scroll-animator';

type AboutSectionProps = {
  isPreview?: boolean;
};

export function AboutSection({ isPreview = false }: AboutSectionProps) {
    return (
        <section id="about" className="w-full bg-background py-12 md:py-24">
            <GsapScrollAnimator>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mx-auto max-w-3xl text-center space-y-4">
                        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl scroll-animate">About SLK Hana Ola</h2>
                        <p className="text-lg font-semibold text-primary scroll-animate">TO PROMOTE, PROTECT AND ADVANCE THE HIGHEST QUALITY HEALTHCARE AT HOME</p>
                    </div>
                    <div className="mt-12 text-base text-foreground/80 text-center max-w-4xl mx-auto space-y-8">
                       <div className="text-lg space-y-4">
                           <p className="font-bold text-xl text-secondary scroll-animate">Because we are committed to your good health...</p>
                           <p className="scroll-animate">
                                SLK Hana Ola, LLC is a newly established home care agency that primarily engages in various personal care and homemaker services in the clients' residences. With our team of caregivers, we make sure that our clients receive top-notch care in their homes.
                           </p>
                           {!isPreview && (
                            <>
                                <p className="scroll-animate">
                                        We envision the company to diversify in the future and provide skilled nursing services and therapeutic services such as physical therapy and occupational therapy.
                                </p>
                                <p className="scroll-animate">
                                        When you need professional assistance and extra support for your loved one, let SLK Hana Ola help you.
                                </p>
                                <p className="scroll-animate">
                                        For more inquiries, please contact us at <a href="tel:808-772-4756" className="text-primary hover:underline">808-772-4756</a>.
                                </p>
                            </>
                           )}
                       </div>
                       
                       <div className="mt-12 grid gap-8 md:grid-cols-2 stagger-container">
                            <Card className="group overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl stagger-card">
                                <CardHeader>
                                    <div className="overflow-hidden rounded-t-lg">
                                        <Image 
                                            src="https://placehold.co/600x400.png"
                                            alt="Our Mission"
                                            width={600}
                                            height={400}
                                            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint="compassionate caregiver"
                                        />
                                    </div>
                                    <CardTitle className="font-headline text-2xl font-bold text-secondary pt-4 scroll-animate">OUR MISSION</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-left text-base scroll-animate">To respectfully and compassionately meet the needs of our clients and their families by listening, planning, educating and delivering the highest quality of individualized home healthcare.</p>
                                </CardContent>
                            </Card>
                            <Card className="group overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl stagger-card">
                                 <CardHeader>
                                    <div className="overflow-hidden rounded-t-lg">
                                        <Image 
                                            src="https://placehold.co/600x400.png"
                                            alt="Our Vision"
                                            width={600}
                                            height={400}
                                            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint="independent senior"
                                        />
                                    </div>
                                    <CardTitle className="font-headline text-2xl font-bold text-secondary pt-4 scroll-animate">OUR VISION</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-left text-base scroll-animate">Our strategic vision is to create and sustain a leading high quality home care service that supports individuals to live as independently as possible in the comfort of their own homes. We personalize our services to meet your situation respectfully, efficiently, and compassionately, fostering independence, preserving dignity and improving quality of life.</p>
                                </CardContent>
                            </Card>
                       </div>

                       <p className="text-xl font-bold text-primary pt-6 scroll-animate">
                        OUR PROFESSIONAL TEAM IS READY TO ASSIST AND PROVIDE EXCEPTIONAL SERVICES
                       </p>
                        {isPreview && (
                            <div className="text-center mt-8 scroll-animate">
                                <Button asChild size="lg" className="hover:bg-yellow-orange">
                                    <Link href="/about">Learn More About Us</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </GsapScrollAnimator>
        </section>
    );
}
