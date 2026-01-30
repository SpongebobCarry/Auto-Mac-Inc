
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS_ADDRESS, BUSINESS_PHONE_DISPLAY, BUSINESS_EMAIL, FACEBOOK_URL } from '@/lib/constants';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');
  const currentYear = new Date().getFullYear();
  const locale = useLocale();

  const navLinks = [
    { href: '/', label: tNav('home') },
    { href: '/used-cars', label: tNav('usedCars') },
    { href: '/services', label: tNav('services') },
    { href: '/book', label: tNav('bookAppointment') },
    { href: '/contact', label: tNav('contact') },
    { href: '/about', label: tNav('about') },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border/40">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <Image src="/images/cars/NoBgLogo.jpg" alt="Auto Mac Logo" width={64} height={64} className="rounded-md" />
              <span className="text-xl font-bold text-primary font-headline">Auto Mac</span>
            </Link>
            <p className="text-sm">{t('tagline')}</p>
            <p className="text-sm mt-2">{BUSINESS_ADDRESS}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => {
                const href = link.href === '/' ? `/${locale}` : `/${locale}${link.href}`;
                return (
                  <li key={link.href}>
                    <Link href={href} className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">{t('connect')}</h3>
            <p className="text-sm">{t('phone')}: {BUSINESS_PHONE_DISPLAY}</p>
            {BUSINESS_EMAIL && <p className="text-sm">{t('email')}: {BUSINESS_EMAIL}</p>}
            <div className="mt-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="AutoMac Montreal Facebook page" className="text-secondary-foreground hover:text-primary transition-colors">
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
           <p>
            {t('copyright', {year: currentYear})}
            <span className="mx-2">|</span>
            <Link href={`/${locale}/privacy`} className="hover:text-primary transition-colors">
              {t('privacyPolicy')}
            </Link>
            <span className="mx-2">|</span>
            <Link href={`/${locale}/copyright`} className="hover:text-primary transition-colors">
              {t('copyrightPolicy')}
            </Link>
            <span className="mx-2">|</span>
            <Link href={`/${locale}/terms`} className="hover:text-primary transition-colors">
              {t('termsAndConditions')}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
