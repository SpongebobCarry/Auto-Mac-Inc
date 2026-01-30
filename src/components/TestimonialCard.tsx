'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { testimonialsData } from '@/lib/data';
import { useTranslations } from 'next-intl';

interface TestimonialCardProps {
  name: string;
  quote: string;
  location?: string;
  avatar?: string;
}

export function TestimonialCard({ name, quote, location, avatar }: TestimonialCardProps) {
  return (
    <Card className="shadow-lg flex flex-col h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        {avatar && (
          <Image
            src={avatar}
            alt={name}
            width={60}
            height={60}
            className="rounded-full"
            data-ai-hint="person avatar"
          />
        )}
        <div>
          <CardTitle className="text-lg font-headline">{name}</CardTitle>
          {location && <p className="text-sm text-muted-foreground">{location}</p>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-foreground/80 italic">&ldquo;{quote}&rdquo;</p>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  const t = useTranslations('HomePage');
  const tData = useTranslations('Data.testimonials');

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
          {t('testimonialsTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              name={tData(`${testimonial.id}.name`)}
              quote={tData(`${testimonial.id}.quote`)}
              location={tData(`${testimonial.id}.location`)}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
