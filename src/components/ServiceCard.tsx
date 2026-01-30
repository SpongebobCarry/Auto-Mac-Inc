'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';

interface ServiceCardProps {
  name: string;
  description: string;
  icon: string;
}

export default function ServiceCard({ name, description, icon }: ServiceCardProps) {
  const t = useTranslations('ServiceCard');
  const locale = useLocale();
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="items-center text-center">
        <div className="text-primary text-4xl mb-4">
          <i className={icon}></i>
        </div>
        <CardTitle className="font-headline text-2xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="text-center flex-grow">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="justify-center p-6">
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/${locale}/book`}>{t('bookNow')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
