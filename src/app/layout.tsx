import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { GsapScrollAnimator } from '@/components/animations/gsap-scroll-animator';

export const metadata: Metadata = {
  title: 'SLK Hana Ola, LLC',
  description: 'Providing compassionate and quality healthcare services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Montserrat:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <GsapScrollAnimator>
            {children}
        </GsapScrollAnimator>
        <Toaster />
      </body>
    </html>
  );
}
