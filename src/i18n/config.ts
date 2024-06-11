import { Pathnames } from 'next-intl/navigation';

const defaultLocale = 'en' as const;

const locales = ['en', 'es'] as const;

const pathnames = {
  '/': '/',
  '/auth': {
    en: '/auth',
    es: '/autenticacion',
  },
  '/auth/error': {
    en: '/auth/error',
    es: '/autenticacion/error',
  },
  '/home': {
    en: '/home',
    es: '/inicio',
  },
} satisfies Pathnames<typeof locales>;

const localePrefix = undefined;

export { defaultLocale, locales, pathnames, localePrefix };

export type AppPathnames = keyof typeof pathnames;
