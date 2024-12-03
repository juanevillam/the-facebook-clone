import { useTranslations } from 'next-intl';

import { FacebookLogoMark, FacebookLogoType } from '@/assets/icons/brand';

export const AuthHeader = () => {
  const t = useTranslations('auth.header');

  return (
    <header className="flex-center-justify-center h-44 bg-gray-100 md:-mt-16 md:block md:w-7/12 md:space-y-4">
      <FacebookLogoMark className="size-14 md:hidden" />
      <FacebookLogoType className="hidden h-12 w-60 fill-primary-100 md:block" />
      <h1 className="hidden text-2xl md:block">{t('title')}</h1>
    </header>
  );
};
