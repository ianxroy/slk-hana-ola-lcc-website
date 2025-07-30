import Image from "next/image";

const services = [
    { name: "Primary Care", description: "Comprehensive health services for all ages, from routine check-ups to chronic disease management.", imageUrl: "https://placehold.co/400x300.png", hint: "doctor patient" },
    { name: "Specialty Referrals", description: "Coordinated access to a network of trusted specialists to ensure you get the expert care you need.", imageUrl: "https://placehold.co/400x300.png", hint: "medical chart" },
    { name: "Wellness Programs", description: "Proactive health and wellness programs designed to keep you and your family healthy and active.", imageUrl: "https://placehold.co/400x300.png", hint: "yoga stretching" },
    { name: "Telehealth Services", description: "Convenient and secure virtual consultations with our healthcare providers from the comfort of your home.", imageUrl: "https://placehold.co/400x300.png", hint: "video call" },
]

export function ServicesSection() {
    return (
        <section id="services" className="scroll-animate w-full py-16 md:py-24 lg:py-32">
             <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
                    <p className="text-lg text-foreground/70">
                        We offer a wide range of services to meet your healthcare needs.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map(service => (
                        <div key={service.name} className="group overflow-hidden rounded-lg bg-card shadow-md transition-shadow duration-300 hover:shadow-2xl">
                           <div className="overflow-hidden">
                             <Image 
                               src={service.imageUrl}
                               alt={service.name}
                               width={400}
                               height={300}
                               className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                               data-ai-hint={service.hint}
                             />
                           </div>
                           <div className="p-6">
                                <h3 className="font-headline text-xl font-bold">{service.name}</h3>
                                <p className="mt-2 text-foreground/80">{service.description}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
