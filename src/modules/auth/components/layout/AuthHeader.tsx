import { useTranslations } from 'next-intl';

import { FacebookLogoMark, FacebookLogoType } from '@/assets/icons/brand';

export const AuthHeader = () => {
  const t = useTranslations('auth.header');

  return (
    <header
      className="flex-center h-44 transition-all duration-500 ease-out md:-mt-16 md:block md:w-7/12 md:space-y-4"
      id="auth-layout-title"
    >
      <FacebookLogoMark className="size-14 md:hidden" />
      <FacebookLogoType className="hidden h-12 w-60 fill-primary-100 md:block dark:fill-white" />
      <h1 className="text-primary hidden text-2xl md:block">{t('title')}</h1>
    </header>
  );
};
