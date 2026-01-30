import type { Metadata } from 'next';
import ServiceCard from '@/components/ServiceCard';
import { servicesData } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'Metadata'});
  
  return {
    title: t('servicesTitle'),
    description: t('servicesDescription'),
  };
}

export default async function ServicesPage({params}: {params: {locale: string}}) {
  const t = await getTranslations({locale: params.locale, namespace: 'ServicesPage'});
  const tData = await getTranslations({locale: params.locale, namespace: 'Data.services'});

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </header>

      <div className="flex flex-wrap justify-center -mx-3 md:-mx-4">
        {servicesData.map((service) => (
          <div key={service.id} className="w-full sm:w-1/2 lg:w-1/3 p-3 md:p-4">
            <ServiceCard 
              name={tData(`${service.id}.name`)}
              description={tData(`${service.id}.description`)}
              icon={service.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
