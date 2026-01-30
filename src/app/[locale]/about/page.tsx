import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShieldCheck, HeartHandshake } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'Metadata'});
  
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
  };
}

export default async function AboutPage({params}: {params: {locale: string}}) {
  const t = await getTranslations({locale: params.locale, namespace: 'AboutPage'});

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </header>

      <Card className="mb-12 shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image
              src="https://placehold.co/800x600.png"
              alt="Auto Mac dealership storefront"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
              data-ai-hint="dealership building"
            />
          </div>
          <div className="p-6 md:p-8">
            <CardTitle className="text-2xl md:text-3xl font-headline mb-4">{t('storyTitle')}</CardTitle>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t('storyP1')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('storyP2')}
            </p>
          </div>
        </div>
      </Card>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">{t('valuesTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle className="font-headline text-xl">{t('value1Title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('value1Desc')}</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <ShieldCheck className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle className="font-headline text-xl">{t('value2Title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('value2Desc')}</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <HeartHandshake className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle className="font-headline text-xl">{t('value3Title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('value3Desc')}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline text-center">{t('commitmentTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4 text-center max-w-3xl mx-auto">
            {t('commitmentDesc')}
          </p>
          <div className="flex justify-center mt-6">
             <Image
              src="https://placehold.co/600x400.png"
              alt="Auto Mac team working"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
              data-ai-hint="team working"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
