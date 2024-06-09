import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { LayoutProps } from '@/assets/types';
import { locales } from '@/i18n/config';

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
      <body>{children}</body>
    </html>
  );
}
