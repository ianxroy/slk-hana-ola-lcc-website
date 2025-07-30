
"use client";

import { useState, React } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from '../logo';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/employment', label: 'Employment' },
  { href: '/contact', label: 'Contact Us' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const MobileNavMenu = () => (
     <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background text-foreground">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <Logo isDark/>
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
                className={cn(
                  "font-headline text-xl font-medium",
                  pathname === link.href && "underline underline-offset-4"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
             <div className="pt-4">
               {user ? (
                 <div className="flex flex-col space-y-4">
                    <Link
                      href={user.role === 'admin' ? "/admin" : "/dashboard"}
                      className="font-headline text-xl font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                   <Button onClick={() => { logout(); setIsOpen(false); }} variant="secondary">Logout</Button>
                 </div>
                ) : (
                  <Button asChild onClick={() => setIsOpen(false)}>
                    <Link href="/login">Login</Link>
                  </Button>
                )}
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )

  const UserProfileDropdown = () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
               <AvatarImage src={user?.photoURL || undefined} alt={user?.email || "User"} />
              <AvatarFallback>
                <UserCircle className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Logged in as</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
           <DropdownMenuItem asChild>
             <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'}>
                Dashboard
             </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#00A7A9] text-primary-foreground backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="SLK Hana Ola Home">
          <Logo />
        </Link>
        
        <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex">
                {!user && (
                    <nav className="flex items-center gap-6">
                        {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "font-headline text-lg font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground",
                                pathname === link.href && "underline underline-offset-4"
                            )}
                        >
                            {link.label}
                        </Link>
                        ))}
                    </nav>
                )}
            </div>

            {user ? (
                <div className="flex items-center gap-4">
                    <UserProfileDropdown />
                    <div className="md:hidden"><MobileNavMenu /></div>
                </div>
            ) : (
                 <div className="flex items-center gap-4">
                    <Button asChild className="hidden md:flex">
                        <Link href="/login">Login</Link>
                    </Button>
                    <div className="md:hidden"><MobileNavMenu /></div>
                </div>
            )}
        </div>
      </div>
    </header>
  );
}
