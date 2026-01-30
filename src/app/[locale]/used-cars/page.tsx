
import type { Metadata } from 'next';
import CarCard from '@/components/CarCard';
import { carsData } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'Metadata'});
  
  return {
    title: t('usedCarsTitle'),
    description: t('usedCarsDescription'),
  };
}

export default async function UsedCarsPage({params}: {params: {locale: string}}) {
  const t = await getTranslations({locale: params.locale, namespace: 'UsedCarsPage'});
  const tData = await getTranslations({locale: params.locale, namespace: 'Data.cars'});

  const availableCars = carsData.filter(car => car.status === 'Available');
  const soldCars = carsData.filter(car => car.status === 'Sold');

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </header>

      {availableCars.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 font-headline">{t('available')}</h2>
          <div className="flex flex-wrap justify-center -m-3 md:-m-4">
            {availableCars.map((car) => (
              <div key={car.id} className="w-full sm:w-1/2 lg:w-1/3 p-3 md:p-4">
                <CarCard 
                  car={{
                    ...car,
                    make: tData(`${car.id}.make`),
                    model: tData(`${car.id}.model`),
                    description: '',
                    features: [],
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {soldCars.length > 0 && availableCars.length > 0 && (
        <Separator className="my-12 md:my-16" />
      )}

      {soldCars.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 font-headline text-muted-foreground">{t('sold')}</h2>
          <div className="flex flex-wrap justify-center -m-3 md:-m-4">
            {soldCars.map((car) => (
              <div key={car.id} className="w-full sm:w-1/2 lg:w-1/3 p-3 md:p-4">
                <CarCard 
                  car={{
                    ...car,
                    make: tData(`${car.id}.make`),
                    model: tData(`${car.id}.model`),
                    description: '',
                    features: [],
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {availableCars.length === 0 && soldCars.length === 0 && (
         <p className="text-center text-muted-foreground text-xl mt-12">
           {t('noCars')}
         </p>
      )}
    </div>
  );
}
