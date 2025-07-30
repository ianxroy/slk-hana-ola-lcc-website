import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, HeartHandshake, Target } from "lucide-react";

export function AboutSection() {
    return (
        <section id="about" className="scroll-animate w-full bg-background py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center space-y-4">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About SLK Hana Ola</h2>
                </div>
                <div className="mt-12 text-lg text-foreground/80 text-center max-w-4xl mx-auto space-y-6">
                   <p className="font-bold text-xl">Because we are committed to your good health...</p>
                   <p>
                        SLK Hana Ola, LLC is a newly established home care agency that primarily engages in various personal care and homemaker services in the clients' residences. With our team of caregivers, we make sure that our clients receive top-notch care in their homes.
                   </p>
                   <p>
                        We envision the company to diversify in the future and provide skilled nursing services and therapeutic services such as physical therapy and occupational therapy.
                   </p>
                   <p>
                        When you need professional assistance and extra support for your loved one, let SLK Hana Ola help you.
                   </p>
                   <p>
                        For more inquiries, please contact us at <a href="tel:808-772-4756" className="text-primary hover:underline">808-772-4756</a>.
                   </p>
                </div>
            </div>
        </section>
    );
}