import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

import { LayoutProps } from '@/assets/types';
import { poppins } from '@/assets/ui/fonts';
import { locales } from '@/i18n/config';

import '@/assets/ui/styles/globals.css';

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title', { author: process.env.NEXT_PUBLIC_AUTHOR }),
    description: t('description'),
  };
}

export default function LocaleLayout({
  params: { locale },
  children,
}: LayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${poppins.className} antialiased`}>
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
