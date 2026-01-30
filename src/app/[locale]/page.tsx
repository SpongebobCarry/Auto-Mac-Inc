'use client';

import HeroSection from '@/components/HeroSection';
import ServicesOverviewHome from '@/components/ServicesOverviewHome';
import { TestimonialsSection } from '@/components/TestimonialCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import FeaturedCars from '@/components/FeaturedCars';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const locale = useLocale();

  return (
    <>
      <HeroSection />
      <ServicesOverviewHome />
      <FeaturedCars />
      <TestimonialsSection />
      
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            {t('ctaSubtitle')}
          </p>
          <div className="space-x-0 space-y-4 md:space-y-0 md:space-x-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 px-8 shadow-lg transition-transform hover:scale-105">
              <Link href={`/${locale}/used-cars`}>{t('ctaBrowse')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg py-3 px-8 shadow-lg transition-transform hover:scale-105">
              <Link href={`/${locale}/contact`}>{t('ctaContact')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
