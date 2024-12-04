import { useTranslations } from 'next-intl';

import { AuthFooterLocaleSwitcher } from './locale-switcher/AuthFooterLocaleSwitcher';

export const AuthFooter = () => {
  const t = useTranslations('auth.footer');

  return (
    <footer className="grid items-center justify-center md:h-1/6 md:justify-normal md:bg-white">
      <div
        aria-labelledby="auth-footer-title"
        className="space-y-3 py-3 md:mx-auto md:w-full md:max-w-4xl md:px-6 md:py-0 lg:max-w-5xl"
      >
        <h2 id="auth-footer-title" className="sr-only">
          {t('footer-section')}
        </h2>
        <AuthFooterLocaleSwitcher />
        <hr className="hidden md:block" />
        <p
          aria-label={t('author-information')}
          className="text-sm text-gray-500"
        >
          {process.env.NEXT_PUBLIC_AUTHOR} © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
