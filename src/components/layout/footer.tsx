import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Facebook, Mail, Phone, MapPin, Printer } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/employment', label: 'Employment' },
  { href: '/contact', label: 'Contact Us' },
];

export function Footer() {
  return (
    <footer id="footer" className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {/* About Us Section */}
          <div className="space-y-4">
            <h3 className="font-headline text-xl font-bold">ABOUT US</h3>
            <p className="text-base">
              We are a newly established home care agency that primarily engages in various, personal care services in the clients' residences.
            </p>
            <p className="text-base">
              We offer individualized care plans to meet your health care needs.
            </p>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
             <h3 className="font-headline text-xl font-bold">CONTACT INFO</h3>
            <address className="space-y-2 not-italic text-base">
              <p className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>94-1161 HeaHea Street<br />Waipahu, HI 96797</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <a href="tel:808-772-4756" className="hover:underline">808-772-4756</a>
              </p>
               <p className="flex items-center gap-2">
                <Printer className="h-5 w-5" />
                <span>808-772-4757</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <a href="mailto:slkhanaola@gmail.com" className="hover:underline">slkhanaola@gmail.com</a>
              </p>
              <p className="flex items-center gap-2">
                <Facebook className="h-5 w-5" />
                <a href="https://www.facebook.com/slk.hanaola/" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
              </p>
            </address>
          </div>
          
          {/* Logo and Nav */}
           <div className="space-y-4">
                <Logo />
                <nav className="flex flex-wrap gap-x-4 gap-y-2">
                    {navLinks.map((link, index) => (
                    <React.Fragment key={link.href}>
                        <Link href={link.href} className="text-base hover:underline">
                        {link.label}
                        </Link>
                        {index < navLinks.length - 1 && <span>|</span>}
                    </React.Fragment>
                    ))}
              </nav>
           </div>
        </div>

        <div className="mt-12 border-t border-background/20 pt-8 text-center text-base space-y-2">
          <p>&copy;{new Date().getFullYear()} SLK Hana Ola, LLC | All Rights Reserved</p>
          <p>
            Designed by <a href="https://hanteck.online" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Ian Roy Barcelona (Hanteck)</a>
          </p>
          <p>
            <Link href="/credits" className="text-sm underline hover:text-primary">View Credits</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
