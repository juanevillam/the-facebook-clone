import { SessionProvider } from 'next-auth/react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

import { poppins } from '@/assets/fonts/poppins';
import { LayoutProps } from '@/assets/types';
import { auth } from '@/auth';
import { NextThemeProvider } from '@/components';
import { locales } from '@/i18n/config';
import ReduxProvider from '@/lib/store/ReduxProvider';

import '@/assets/globals.css';

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

export default async function LocaleLayout({
  params: { locale },
  children,
}: LayoutProps) {
  unstable_setRequestLocale(locale);

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang={locale} suppressHydrationWarning>
        <body className={`${poppins.className} antialiased`}>
          <Toaster position="bottom-center" />
          <NextThemeProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </NextThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
