import { useLocale, useTranslations } from 'next-intl';

import { locales } from '@/i18n/config';

import { AuthFooterLocaleSwitcherSelect } from './select/auth-footer-locale-switcher-select';

export const AuthFooterLocaleSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations('auth.footer.locale-switcher');

  return (
    <div className="flex justify-center md:justify-start">
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
