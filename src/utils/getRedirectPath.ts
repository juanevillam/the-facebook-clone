import { pathnames } from '@/i18n/config';

export type localeType = 'en' | 'es';

export const getRedirectPath = (locale: localeType) => {
  return pathnames['/home'][locale] || pathnames['/home'].en;
};
