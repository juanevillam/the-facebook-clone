import { useTranslations } from 'next-intl';

import { AuthFooterLocaleSwitcher } from './locale-switcher/AuthFooterLocaleSwitcher';

export const AuthFooter = () => {
  const t = useTranslations('auth.footer');

  return (
    <footer
      aria-labelledby="auth-footer-title"
      className="bg-card grid h-full items-end justify-center transition-colors duration-300 md:h-1/6 md:items-center md:justify-normal"
    >
      <h2 id="auth-footer-title" className="sr-only">
        {t('footer-section')}
      </h2>
      <div className="space-y-3 py-3 md:mx-auto md:w-full md:max-w-4xl md:px-6 md:py-0 lg:max-w-5xl">
        <AuthFooterLocaleSwitcher />
        <hr className="border-primary hidden md:block" />
        <p
          aria-label={t('author-information')}
          className="text-tertiary text-sm transition-opacity duration-300 ease-in-out hover:opacity-80"
        >
          {process.env.NEXT_PUBLIC_AUTHOR} © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
