import type { Metadata } from 'next';
import Image from 'next/image';
import { carsData } from '@/lib/data';
import type { Car } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Gauge, Tag, Settings, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import CarImageGallery from '@/components/CarImageGallery';

export async function generateMetadata(
  {params}: {params: {id: string, locale: string}}
): Promise<Metadata> {
  const tData = await getTranslations({locale: params.locale, namespace: 'Data.cars'});
  const tDetail = await getTranslations({locale: params.locale, namespace: 'CarDetailPage'});
  const carData = carsData.find((c) => c.id === params.id);

  if (!carData) {
    return {
      title: tDetail('notFound')
    };
  }

  const carTitle = `${carData.year} ${tData(`${carData.id}.make`)} ${tData(`${carData.id}.model`)}`;

  return {
    title: carTitle,
    description: tData(`${carData.id}.description`),
  };
}


interface CarDetailPageProps {
  params: { id: string; locale: string };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const t = await getTranslations({locale: params.locale, namespace: 'CarDetailPage'});
  const tData = await getTranslations({locale: params.locale, namespace: 'Data.cars'});

  const carData = carsData.find((c) => c.id === params.id);

  if (!carData) {
    notFound();
  }
  
  const car: Car = {
    ...carData,
    make: tData(`${carData.id}.make`),
    model: tData(`${carData.id}.model`),
    description: tData(`${carData.id}.description`),
    features: tData.raw(`${carData.id}.features`)
  }
  const locale = params.locale;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Button asChild variant="outline" className="mb-8">
        <Link href={`/${locale}/used-cars`}>
          <ArrowLeft className="mr-2 h-4 w-4" /> {t('back')}
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
        <div className="lg:col-span-3">
          <CarImageGallery images={car.images} alt={`${car.make} ${car.model}`} />
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-3xl md:text-4xl font-bold font-headline text-primary">
                  {car.year} {car.make} {car.model}
                </CardTitle>
                <Badge 
                  className={`text-sm whitespace-nowrap ${car.status === 'Sold' ? 'bg-destructive text-destructive-foreground' : 'bg-green-600 text-white'}`}
                >
                  {car.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-3xl font-bold text-accent flex items-center">
                <Tag className="h-7 w-7 mr-2" /> ${car.price.toLocaleString()}
              </div>
              
              <Separator />

              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium text-foreground/90">{t('year')}:</span>&nbsp;{car.year}
                </div>
                <div className="flex items-center">
                  <Gauge className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium text-foreground/90">{t('mileage')}:</span>&nbsp;{car.mileage.toLocaleString()} km
                </div>
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium text-foreground/90">{t('status')}:</span>&nbsp;{car.status}
                </div>
              </div>

              <Separator />
              
              <div>
                <h3 className="text-xl font-semibold mb-3 font-headline">{t('description')}</h3>
                <p className="text-foreground/80 leading-relaxed">{car.description}</p>
              </div>

              {car.features && car.features.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-3 font-headline">{t('features')}</h3>
                    <ul className="space-y-2">
                      {car.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-foreground/80">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              
              {car.status === 'Available' && (
                <>
                  <Separator />
                  <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-6">
                    <Link href={`/${locale}/book`}>{t('inquire')}</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
