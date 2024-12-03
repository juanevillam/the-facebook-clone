import { useTranslations } from 'next-intl';

import { ChainBroken } from '@/assets/ui/icons';

export const NotAvailableForDesktop = () => {
  const t = useTranslations('feedback.not-available-for-desktop');

  return (
    <div className="flex-center-justify-center h-[calc(100vh-114px)] flex-col p-6 text-center">
      <ChainBroken className="mb-4 size-28" />
      <h1 className="primary-text mb-2 text-2xl font-semibold">{t('title')}</h1>
      <p className="tertiary-text text-sm">{t('description')}</p>
    </div>
  );
};
