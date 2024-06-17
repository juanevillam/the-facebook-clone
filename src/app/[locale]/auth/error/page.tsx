import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { AlertTriangleImage } from '@/components/images';
import { AuthCard } from '@/modules/auth/components/ui';

export default function ErrorPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  const t = useTranslations('auth.error');

  return (
    <AuthCard
      info={{
        title: t('title'),
        description: t('description'),
      }}
      showChildrenOn="top"
    >
      <AlertTriangleImage size={32} />
    </AuthCard>
  );
}
