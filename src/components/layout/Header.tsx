'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Navbar');
  const [isOpen, setIsOpen] = useState(false);
  const pathnameWithLocale = usePathname();
  const locale = useLocale();

  // Remove locale prefix from pathname for active link comparison
  const pathname = pathnameWithLocale.startsWith(`/${locale}`)
    ? pathnameWithLocale.substring(`/${locale}`.length) || '/'
    : pathnameWithLocale;

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/used-cars', label: t('usedCars') },
    { href: '/services', label: t('services') },
    { href: '/book', label: t('bookAppointment') },
    { href: '/contact', label: t('contact') },
    { href: '/about', label: t('about') },
  ];

  useEffect(() => {
    setIsOpen(false); 
  }, [pathnameWithLocale]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/images/cars/NoBgLogo.jpg" alt="Auto Mac Logo" width={64} height={64} className="rounded-md" />
          <span className="text-xl font-bold text-primary font-headline">Auto Mac</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            const href = link.href === '/' ? `/${locale}` : `/${locale}${link.href}`;
            return (
              <Link
                key={link.href}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <LanguageSwitcher />
        </nav>
        <div className="md:hidden flex items-center">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background shadow-lg">
          <nav className="container mx-auto flex flex-col space-y-2 p-4">
            {navLinks.map((link) => {
               const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
               const href = link.href === '/' ? `/${locale}` : `/${locale}${link.href}`;
               return (
                <Link
                  key={link.href}
                  href={href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-foreground hover:text-primary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
               )
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
