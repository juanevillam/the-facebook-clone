import { useTranslations } from 'next-intl';

import { ChainBroken } from '@/assets/ui/icons';

export const NotAvailableYet = () => {
  const t = useTranslations('feedback.not-available-yet');

  return (
    <div className="flex-center-justify-center h-[calc(100vh-226px)] flex-col p-10 text-center md:h-[calc(100vh-114px)]">
      <ChainBroken className="mb-4 size-28" />
      <h1 className="primary-text mb-2 text-2xl font-semibold">{t('title')}</h1>
      <p className="tertiary-text text-sm">
        {t('description', { author: process.env.NEXT_PUBLIC_AUTHOR })}
      </p>
    </div>
  );
};
