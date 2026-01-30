'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathnameWithLocale = usePathname();

  const onSelectChange = (newLocale: string) => {
    // remove current locale from path to get the base path
    const basePath = pathnameWithLocale.startsWith(`/${locale}`)
      ? pathnameWithLocale.substring(`/${locale}`.length)
      : pathnameWithLocale;
    
    router.replace(`/${newLocale}${basePath || '/'}`);
  };

  return (
    <Select value={locale} onValueChange={onSelectChange}>
      <SelectTrigger className="w-auto gap-2 border-none bg-transparent shadow-none focus:ring-0">
        <Globe className="h-5 w-5" />
        <SelectValue placeholder={t('label')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
      </SelectContent>
    </Select>
  );
}
