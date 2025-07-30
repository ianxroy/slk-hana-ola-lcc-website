
export function AboutSection() {
    return (
        <section id="about" className="scroll-animate w-full bg-background py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center space-y-4">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About SLK Hana Ola</h2>
                    <p className="text-xl font-semibold text-primary">TO PROMOTE, PROTECT AND ADVANCE THE HIGHEST QUALITY HEALTHCARE AT HOME</p>
                </div>
                <div className="mt-12 text-lg text-foreground/80 text-center max-w-4xl mx-auto space-y-8">
                   <div>
                       <p className="font-bold text-xl">Because we are committed to your good health...</p>
                       <p className="mt-4">
                            SLK Hana Ola, LLC is a newly established home care agency that primarily engages in various personal care and homemaker services in the clients' residences. With our team of caregivers, we make sure that our clients receive top-notch care in their homes.
                       </p>
                       <p className="mt-4">
                            We envision the company to diversify in the future and provide skilled nursing services and therapeutic services such as physical therapy and occupational therapy.
                       </p>
                       <p className="mt-4">
                            When you need professional assistance and extra support for your loved one, let SLK Hana Ola help you.
                       </p>
                       <p className="mt-4">
                            For more inquiries, please contact us at <a href="tel:808-772-4756" className="text-primary hover:underline">808-772-4756</a>.
                       </p>
                   </div>
                   
                   <div className="space-y-6">
                        <div>
                            <h3 className="font-headline text-2xl font-bold text-secondary">OUR MISSION</h3>
                            <p className="mt-2">To respectfully and compassionately meet the needs of our clients and their families by listening, planning, educating and delivering the highest quality of individualized home healthcare.</p>
                        </div>
                        <div>
                            <h3 className="font-headline text-2xl font-bold text-secondary">OUR VISION</h3>
                            <p className="mt-2">Our strategic vision is to create and sustain a leading high quality home care service that supports individuals to live as independently as possible in the comfort of their own homes.</p>
                            <p className="mt-2">We personalize our services to meet your situation respectfully, efficiently, and compassionately, fostering independence, preserving dignity and improving quality of life.</p>
                        </div>
                   </div>

                   <p className="text-xl font-bold text-primary pt-6">
                    OUR PROFESSIONAL TEAM IS READY TO ASSIST AND PROVIDE EXCEPTIONAL SERVICES
                   </p>
                </div>
            </div>
        </section>
    );
}
