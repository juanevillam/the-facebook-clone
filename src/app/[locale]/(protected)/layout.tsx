import { unstable_setRequestLocale } from 'next-intl/server';

import { LayoutProps } from '@/assets/types';
import { LayoutWrapper } from '@/components/ui/layout';

export default async function ProtectedLayout({
  params: { locale },
  children,
}: LayoutProps) {
  unstable_setRequestLocale(locale);

  return <LayoutWrapper locale={locale}>{children}</LayoutWrapper>;
}
