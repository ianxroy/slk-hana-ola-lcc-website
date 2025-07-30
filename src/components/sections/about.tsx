import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, HeartHandshake, Target } from "lucide-react";

const aboutItems = [
    {
        icon: Users,
        title: "Our Team",
        description: "Our dedicated team of healthcare professionals is committed to providing the highest quality of care with compassion and respect."
    },
    {
        icon: HeartHandshake,
        title: "Our Philosophy",
        description: "We believe in a holistic approach to healthcare, focusing on the physical, emotional, and spiritual well-being of every individual."
    },
    {
        icon: Target,
        title: "Our Mission",
        description: "To empower our patients and community to achieve optimal health and wellness through education, prevention, and personalized care."
    }
]

export function AboutSection() {
    return (
        <section id="about" className="scroll-animate w-full bg-background py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center space-y-4">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About SLK Hana Ola</h2>
                    <p className="text-lg text-foreground/70">
                        Founded on the principles of 'Hana Ola' - the work of healing - we are more than just a healthcare provider. We are a part of your community, dedicated to your family's health.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {aboutItems.map((item, index) => (
                        <Card key={index} className="bg-secondary text-secondary-foreground shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <item.icon className="h-10 w-10 text-primary" />
                                <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
