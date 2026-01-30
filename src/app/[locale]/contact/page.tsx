import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import { BUSINESS_ADDRESS, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL, BUSINESS_EMAIL, FACEBOOK_URL } from '@/lib/constants';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale, namespace: 'Metadata'});
  
  return {
    title: t('contactTitle'),
    description: t('contactDescription'),
  };
}

export default async function ContactPage({params}: {params: {locale: string}}) {
  const t = await getTranslations({locale: params.locale, namespace: 'ContactPage'});
  const hoursKeys = ['0', '1', '2'] as const;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">{t('infoTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 mr-4 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">{t('address')}</h3>
                <p className="text-muted-foreground">{BUSINESS_ADDRESS}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 mr-4 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">{t('phone')}</h3>
                <a href={`tel:${BUSINESS_PHONE_TEL}`} className="text-muted-foreground hover:text-primary transition-colors">{BUSINESS_PHONE_DISPLAY}</a>
              </div>
            </div>
            {BUSINESS_EMAIL && (
              <div className="flex items-start">
                <Mail className="h-6 w-6 mr-4 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{t('email')}</h3>
                  <a href={`mailto:${BUSINESS_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">{BUSINESS_EMAIL}</a>
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">{t('hoursTitle')}</h3>
              <ul className="text-muted-foreground list-disc list-inside pl-1 space-y-1">
                {hoursKeys.map(key => <li key={key}>{t(`hours.${key}`)}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">{t('mapTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video overflow-hidden rounded-lg border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.351239853926!2d-73.64991192369668!3d45.48316317107125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc919866202e861%3A0xd6c77d9c6d1d4995!2s7146%20Chemin%20de%20la%20C%C3%B4te-des-Neiges%2C%20Montr%C3%A9al%2C%20QC%20H3R%202L9%2C%20Canada!5e0!3m2!1sen!2sus!4v1720556637389!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Google Map of Auto Mac"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 md:mt-12 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{t('facebookTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-w-16 aspect-h-9 md:aspect-h-7 lg:aspect-h-5 overflow-hidden rounded-lg border">
             <iframe 
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_URL)}&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`} 
                width="500" 
                height="500" 
                style={{border:'none', overflow:'hidden'}} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Auto Mac Facebook Page"
                className="w-full h-full min-h-[500px]"
              ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
