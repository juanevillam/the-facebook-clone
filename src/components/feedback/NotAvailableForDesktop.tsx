import { useTranslations } from 'next-intl';

import { ChainBroken } from '@/assets/icons';

export const NotAvailableForDesktop = () => {
  const t = useTranslations('feedback.not-available-for-desktop');

  return (
    <div className="flex-center h-[calc(100vh-114px)] flex-col p-6 text-center">
      <ChainBroken />
      <h1 className="text-primary mb-2 text-2xl font-semibold transition-colors duration-150">
        {t('title')}
      </h1>
      <p className="text-tertiary text-sm transition-colors duration-150">
        {t('description')}
      </p>
    </div>
  );
};
