import createIntlMiddleware from 'next-intl/middleware';

import { defaultLocale, locales, pathnames, localePrefix } from '@/i18n/config';

const intlMiddleware = createIntlMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

export default intlMiddleware;
