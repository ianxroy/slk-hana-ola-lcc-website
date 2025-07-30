import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const libraries = [
    { name: 'Next.js', link: 'https://nextjs.org/' },
    { name: 'React', link: 'https://react.dev/' },
    { name: 'Tailwind CSS', link: 'https://tailwindcss.com/' },
    { name: 'TypeScript', link: 'https://www.typescriptlang.org/' },
    { name: 'Firebase', link: 'https://firebase.google.com/' },
    { name: 'Shadcn/UI', link: 'https://ui.shadcn.com/' },
    { name: 'Lucide React', link: 'https://lucide.dev/' },
    { name: 'GSAP', link: 'https://gsap.com/' },
    { name: 'EmailJS', link: 'https://www.emailjs.com/' },
    { name: 'Zod', link: 'https://zod.dev/' },
    { name: 'React Hook Form', link: 'https://react-hook-form.com/' },
    { name: 'Google Fonts', link: 'https://fonts.google.com/' },
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
                 <div className="flex flex-wrap gap-4">
                  {libraries.map((lib) => (
                    <Link key={lib.name} href={lib.link} target="_blank" rel="noopener noreferrer">
                      <Badge variant="secondary" className="text-base px-4 py-2 transition-transform hover:scale-105">
                        {lib.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
