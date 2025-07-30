"use client";

import { useState, React } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { LoginDialog } from '@/components/login-dialog';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#employment', label: 'Employment' },
  { href: '#contact', label: 'Contact Us' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-accent/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2" aria-label="SLK Hana Ola Home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-headline text-lg font-medium text-accent-foreground/80 transition-colors hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
          <LoginDialog />
        </nav>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b p-4">
                  <Logo />
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close navigation menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col items-start gap-4 p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-headline text-xl font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <LoginDialog />
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
