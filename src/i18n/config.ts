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
  '/auth/verify-email': {
    en: '/auth/verify-email',
    es: '/autenticacion/verificar-email',
  },
  '/auth/forgot-password': {
    en: '/auth/forgot-password',
    es: '/autenticacion/olvide-contrasena',
  },
  '/auth/reset-password': {
    en: '/auth/reset-password',
    es: '/autenticacion/restablecer-contrasena',
  },
  '/friends': {
    en: '/friends',
    es: '/amigos',
  },
  '/watch': {
    en: '/watch',
    es: '/ver',
  },
  '/marketplace': {
    en: '/marketplace',
    es: '/mercado',
  },
  '/groups': {
    en: '/groups',
    es: '/grupos',
  },
  '/posts': {
    en: '/posts',
    es: '/publicaciones',
  },
} satisfies Pathnames<typeof locales>;

const localePrefix = undefined;

export { defaultLocale, locales, pathnames, localePrefix };

export type AppPathnames = keyof typeof pathnames;
