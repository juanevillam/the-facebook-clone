import { useTranslations } from 'next-intl';

import { FacebookLogoMark, FacebookLogoType } from '@/assets/ui/icons/brand';

export const AuthHeader = () => {
  const t = useTranslations('auth.header');

  return (
    <header className="bg-smoke-100 flex h-44 items-center justify-center md:block md:space-y-4 md:w-7/12 md:-mt-16">
      <FacebookLogoMark className="size-14 md:hidden" />
      <FacebookLogoType className="fill-primary-100 hidden h-12 w-60 md:block" />
      <h1 className="hidden text-2xl md:block">{t('title')}</h1>
    </header>
  );
};
