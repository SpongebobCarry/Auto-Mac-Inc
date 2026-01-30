import type { Metadata } from 'next';
import BookingForm from '@/components/BookingForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'Metadata'});
  
  return {
    title: t('bookingTitle'),
    description: t('bookingDescription'),
  };
}

export default async function BookingPage({params}: {params: {locale: string}}) {
  const t = await getTranslations({locale: params.locale, namespace: 'BookingPage'});

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </header>

      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{t('formTitle')}</CardTitle>
          <CardDescription>{t('formDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <BookingForm />
        </CardContent>
      </Card>
    </div>
  );
}
