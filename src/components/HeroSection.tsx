'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('HomePage');
  const locale = useLocale();

  return (
    <section className="relative h-[70vh] min-h-[400px] max-h-[600px] w-full flex items-center justify-center text-center text-white">
      <Image
        src="/images/cars/HeroImage.jpg"
        alt="Modern cars parked at a dealership"
        layout="fill"
        objectFit="cover"
        quality={80}
        priority
        className="brightness-50"
        data-ai-hint="dealership cars"
      />
      <div className="relative z-10 p-4 md:p-8 rounded-lg max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg font-headline">
          {t('heroTitle')}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 drop-shadow-md">
          {t('heroSubtitle')}
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 px-8 shadow-lg transition-transform hover:scale-105">
          <Link href={`/${locale}/used-cars`}>{t('heroCta')}</Link>
        </Button>
      </div>
    </section>
  );
}
