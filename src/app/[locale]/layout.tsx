
import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {getTranslations} from 'next-intl/server';


const APP_NAME = 'Auto Mac';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';


export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  const APP_DESCRIPTION = t('description');

  return {
    applicationName: APP_NAME,
    title: {
      default: t('title'),
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
    keywords: t('keywords').split(', '),
    authors: [{ name: 'Auto Mac' }],
    creator: 'Auto Mac',
    publisher: 'Auto Mac',
    
    openGraph: {
      type: 'website',
      locale: locale,
      url: BASE_URL,
      title: {
        default: t('title'),
        template: `%s | ${APP_NAME}`,
      },
      description: APP_DESCRIPTION,
      siteName: APP_NAME,
      images: [
        {
          url: `${BASE_URL}/images/cars/Logo.jpg`, 
          width: 1200,
          height: 630,
          alt: `${APP_NAME} Dealership`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: t('title'),
        template: `%s | ${APP_NAME}`,
      },
      description: APP_DESCRIPTION,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: APP_NAME,
    },
    formatDetection: {
      telephone: false,
    },
    icons: {
      icon: '/images/cars/NoBgLogo.jpg',
    },
  };
}


export const viewport: Viewport = {
  themeColor: '#6699CC',
}


export default function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
