
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { servicesData } from '@/lib/data';
import { useTranslations } from 'next-intl';
import { createBooking } from '@/lib/actions';
import { useState } from 'react';

export default function BookingForm() {
  const t = useTranslations('BookingForm');
  const tServices = useTranslations('Data.services');
  const tPage = useTranslations('BookingPage');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bookingFormSchema = z.object({
    name: z.string().min(2, { message: t('nameError') }),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: t('phoneError') }),
    email: z.string().email({ message: t('emailError') }),
    serviceType: z.string({ required_error: t('serviceError') }),
    date: z.date({ required_error: t('dateError') }),
    message: z.string().optional(),
  });
  
  type BookingFormValues = z.infer<typeof bookingFormSchema>;
  
  const { toast } = useToast();
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true);
    const serviceName = tServices(`${data.serviceType}.name`);
    
    // Convert all fields to strings for the action, as requested
    const result = await createBooking({
      name: data.name,
      phone: data.phone,
      email: data.email,
      serviceName: serviceName,
      date: format(data.date, 'yyyy-MM-dd'),
      message: data.message || '',
    });

    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: tPage('submitSuccessTitle'),
        description: tPage('submitSuccessDesc', {
          name: data.name,
          service: serviceName,
          date: format(data.date, 'PPP')
        }),
        variant: 'default', 
      });
      form.reset();
    } else {
      toast({
        title: 'Submission Failed',
        description: result.message,
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('nameLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('namePlaceholder')} {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phoneLabel')}</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder={t('phonePlaceholder')} {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('emailLabel')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t('emailPlaceholder')} {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('serviceLabel')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('servicePlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {servicesData.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {tServices(`${service.id}.name`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('dateLabel')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                        disabled={isSubmitting}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>{t('datePlaceholder')}</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('messageLabel')}</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[100px] resize-y"
                  placeholder={t('messagePlaceholder')}
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t('submitButton')}
        </Button>
      </form>
    </Form>
  );
}
