import { useLocale, useTranslations } from 'next-intl';

import { locales } from '@/i18n/config';

import { AuthFooterLocaleSwitcherSelect } from './AuthFooterLocaleSwitcherSelect';

export const AuthFooterLocaleSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations('auth.footer.locale-switcher');

  return (
    <div
      aria-labelledby="locale-switcher-title"
      className="flex justify-center md:justify-start"
    >
      <h3 id="locale-switcher-title" className="sr-only">
        {t('title')}
      </h3>
      <AuthFooterLocaleSwitcherSelect defaultValue={locale} label={t('label')}>
        {locales.map((item) => (
          <option key={item} value={item}>
            {t('locale', { locale: item })}
          </option>
        ))}
      </AuthFooterLocaleSwitcherSelect>
    </div>
  );
};
