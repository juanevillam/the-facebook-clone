import { useTranslations } from 'next-intl';

import { FacebookLogoMark, FacebookLogoType } from '@/assets/ui/icons/brand';

export const AuthHeader = () => {
  const t = useTranslations('auth.header');

  return (
    <header className="flex-center-justify-center md:block bg-gray-100 h-44 md:-mt-16 md:space-y-4 md:w-7/12">
      <FacebookLogoMark className="size-14 md:hidden" />
      <FacebookLogoType className="hidden md:block fill-primary-100 h-12 w-60" />
      <h1 className="hidden md:block text-2xl">{t('title')}</h1>
    </header>
  );
};
