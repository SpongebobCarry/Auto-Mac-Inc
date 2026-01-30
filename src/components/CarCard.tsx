'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Car } from '@/lib/types';
import { CalendarDays, Gauge, Tag } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const t = useTranslations('CarCard');
  const locale = useLocale();
  
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Link href={`/${locale}/used-cars/${car.id}`} className="block w-full h-48 md:h-56 relative">
          <Image
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint="used car"
          />
        </Link>
        <Badge 
          className={`absolute top-2 right-2 text-xs ${car.status === 'Sold' ? 'bg-destructive text-destructive-foreground' : 'bg-green-600 text-white'}`}
        >
          {car.status}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/${locale}/used-cars/${car.id}`}>
          <CardTitle className="text-xl font-headline mb-2 hover:text-primary transition-colors">{car.make} {car.model}</CardTitle>
        </Link>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
            <span>{t('year')}: {car.year}</span>
          </div>
          <div className="flex items-center">
            <Gauge className="h-4 w-4 mr-2 text-primary" />
            <span>{t('mileage')}: {car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2 text-primary" />
            <span className="font-semibold text-lg text-foreground">${car.price.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/${locale}/used-cars/${car.id}`}>{t('details')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
