'use client';

import { carsData } from '@/lib/data';
import CarCard from '@/components/CarCard';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FeaturedCars() {
  const t = useTranslations('HomePage');
  const tData = useTranslations('Data.cars');
  const locale = useLocale();

  const featuredCars = carsData.filter(car => car.status === 'Available').slice(0, 4);

  if (featuredCars.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
          {t('featuredTitle')}
        </h2>
        <div className="flex flex-wrap justify-center -m-3 md:-m-4">
          {featuredCars.map((car) => (
            <div key={car.id} className="w-full sm:w-1/2 lg:w-1/3 p-3 md:p-4">
              <CarCard 
                car={{
                  ...car,
                  make: tData(`${car.id}.make`),
                  model: tData(`${car.id}.model`),
                  description: '', // not needed for card
                  features: [], // not needed for card
                }}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg py-3 px-8 shadow-lg transition-transform hover:scale-105">
             <Link href={`/${locale}/used-cars`}>{t('featuredViewAll')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
