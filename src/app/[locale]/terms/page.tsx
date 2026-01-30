
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BUSINESS_PHONE_DISPLAY, BUSINESS_ADDRESS } from '@/lib/constants';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'TermsPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function TermsAndConditionsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'TermsPage' });
  const locale = params.locale;
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">{t('title')}</h1>
      <p className="text-sm text-muted-foreground mb-8">{t('effectiveDate', {date: formattedDate})}</p>

      <div className="space-y-6 text-foreground/80 leading-relaxed">
        <p>{t('intro')}</p>

        <section className="space-y-2">
          <h2 className="text-2xl font-bold font-headline mt-6 mb-2">{t('section1Title')}</h2>
          <p>{t('section1Intro')}</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t('section1Point1')}</li>
            <li>{t('section1Point2')}</li>
            <li>{t('section1Point3')}</li>
            <li>{t('section1Point4')}</li>
            <li>{t('section1Point5')}</li>
            <li>{t('section1Point6')}</li>
          </ul>
           <p>{t('section1Outro')}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-bold font-headline mt-6 mb-2">{t('section2Title')}</h2>
           <ul className="list-disc pl-6 space-y-1">
            <li>{t('section2Point1')}</li>
            <li>{t('section2Point2')}</li>
            <li>{t('section2Point3')}</li>
            <li>{t('section2Point4')}</li>
            <li>{t('section2Point5')}</li>
          </ul>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-2xl font-bold font-headline mt-6 mb-2">{t('section3Title')}</h2>
           <ul className="list-disc pl-6 space-y-1">
            <li>{t('section3Point1')}</li>
            <li>{t('section3Point2')}</li>
            <li>{t('section3Point3')}</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-bold font-headline mt-6 mb-2">{t('section4Title')}</h2>
           <ul className="list-disc pl-6 space-y-1">
            <li>{t('section4Point1')}</li>
            <li>{t('section4Point2')}</li>
            <li>{t('section4Point3')}</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-bold font-headline mt-6 mb-2">{t('section5Title')}</h2>
           <p>{t('section5Point1')}</p>
           <p>{t('section5Point2')}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-bold font-headline mt-6 mb-2">{t('section6Title')}</h2>
           <p>{t('section6Point1')}</p>
           <p>{t('section6Point2')}</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-2xl font-bold font-headline mt-6 mb-2">{t('section7Title')}</h2>
           <p>{t('section7Point1')}</p>
           <p>{t('section7Point2')}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-bold font-headline mt-6 mb-2">{t('section8Title')}</h2>
           <p>{t('section8Point1')}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-bold font-headline mt-6 mb-2">{t('section9Title')}</h2>
           <p>{t('section9Point1')}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-bold font-headline mt-6 mb-2">{t('section10Title')}</h2>
          <p>{t('section10Intro')}</p>
          <address className="not-italic bg-secondary p-4 rounded-lg">
            <strong>Auto Mac</strong><br />
            {BUSINESS_ADDRESS}<br />
            {t('phoneLabel')}: {BUSINESS_PHONE_DISPLAY}
          </address>
        </section>
      </div>
    </div>
  );
}
