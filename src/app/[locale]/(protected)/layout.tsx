import { unstable_setRequestLocale } from 'next-intl/server';

import { LayoutProps } from '@/assets/types';
import { LayoutWrapper } from '@/components/layout';

const ProtectedLayout = async ({
  params: { locale },
  children,
}: LayoutProps) => {
  unstable_setRequestLocale(locale);

  return <LayoutWrapper locale={locale}>{children}</LayoutWrapper>;
};

export default ProtectedLayout;
