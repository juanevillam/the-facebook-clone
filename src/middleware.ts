import createIntlMiddleware from 'next-intl/middleware';

import { defaultLocale, locales, pathnames, localePrefix } from '@/i18n/config';

export default createIntlMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

export const config = {
  matcher: ['/', '/(en|es)/:path*'],
};
