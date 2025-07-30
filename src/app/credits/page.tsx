
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const libraries = [
    { name: 'Next.js', link: 'https://nextjs.org/', description: 'The React framework for building the full-stack web application, handling routing, rendering, and server-side logic.' },
    { name: 'React', link: 'https://react.dev/', description: 'The JavaScript library for building the user interface components.' },
    { name: 'Tailwind CSS', link: 'https://tailwindcss.com/', description: 'A utility-first CSS framework for styling the application.' },
    { name: 'TypeScript', link: 'https://www.typescriptlang.org/', description: 'The language used for writing the application code, providing static typing.' },
    { name: 'Firebase', link: 'https://firebase.google.com/', description: 'The backend platform used for authentication, database (Firestore), and file storage.' },
    { name: 'Shadcn/UI', link: 'https://ui.shadcn.com/', description: 'A collection of re-usable UI components built on top of Radix UI and Tailwind CSS.' },
    { name: 'Lucide React', link: 'https://lucide.dev/', description: 'The icon library used throughout the application.' },
    { name: 'GSAP', link: 'https://gsap.com/', description: 'A JavaScript library for creating high-performance animations.' },
    { name: 'EmailJS', link: 'https://www.emailjs.com/', description: 'A service used to send emails from the contact form without a dedicated backend.' },
    { name: 'Zod', link: 'https://zod.dev/', description: 'A TypeScript-first schema declaration and validation library, used for form validation.' },
    { name: 'React Hook Form', link: 'https://react-hook-form.com/', description: 'A library for managing form state and validation in React.' },
    { name: 'Google Fonts', link: 'https://fonts.google.com/', description: 'A library of open-source fonts used for the site\'s typography (Poppins and PT Sans).' },
];

export default function CreditsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Credits & Acknowledgements
            </h1>
            <p className="mt-4 text-lg text-foreground/80">
              This project was made possible by the hard work of many individuals and the open-source community.
            </p>
          </div>

          <div className="mt-16 grid gap-12">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold text-primary">Developer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  This website was designed and developed by{' '}
                  <a
                    href="https://hanteck.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-secondary underline hover:text-secondary/80"
                  >
                    Ian Roy Barcelona (Hanteck)
                  </a>.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold text-primary">
                  Powered By
                </CardTitle>
                <p className="text-base text-muted-foreground">
                    This website is built with modern technologies and libraries from the open-source community.
                </p>
              </CardHeader>
              <CardContent>
                 <ul className="space-y-6">
                  {libraries.map((lib) => (
                    <li key={lib.name} className="border-b pb-4 last:border-b-0">
                       <Link href={lib.link} target="_blank" rel="noopener noreferrer">
                        <h3 className="text-xl font-bold text-secondary underline hover:text-secondary/80">{lib.name}</h3>
                      </Link>
                      <p className="mt-2 text-base text-foreground/90">{lib.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
