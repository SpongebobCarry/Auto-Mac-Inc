'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Search, ShieldCheck } from 'lucide-react'; 
import { useLocale, useTranslations } from 'next-intl';


export default function ServicesOverviewHome() {
  const t = useTranslations('ServicesOverviewHome');
  const locale = useLocale();

  const overviewServices = [
    {
      title: t('qualityCars'),
      description: t('qualityCarsDesc'),
      icon: <Search className="h-10 w-10 text-primary mb-4" />,
      link: '/used-cars',
      linkLabel: t('browseInventory'),
    },
    {
      title: t('expertRepair'),
      description: t('expertRepairDesc'),
      icon: <Wrench className="h-10 w-10 text-primary mb-4" />,
      link: '/services',
      linkLabel: t('ourServices'),
    },
    {
      title: t('customerSatisfaction'),
      description: t('customerSatisfactionDesc'),
      icon: <ShieldCheck className="h-10 w-10 text-primary mb-4" />,
      link: '/about',
      linkLabel: t('learnMore'),
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
          {useTranslations('HomePage')('whyChooseTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {overviewServices.map((service) => (
            <Card key={service.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                {service.icon}
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <p className="text-muted-foreground mb-6">{service.description}</p>
              </CardContent>
              <div className="p-6 pt-0 text-center">
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link href={`/${locale}${service.link}`}>{service.linkLabel}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
