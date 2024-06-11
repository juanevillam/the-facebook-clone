import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { locales } from '@/i18n/config';
import { authRoutes } from '@/routes';

import intlMiddleware from './intlMiddleware';

export const authPathnameRegex = RegExp(
  `^(/(${locales.join('|')}))?(${authRoutes
    .flatMap((p) => (p === '/' ? ['', '/'] : p))
    .join('|')})/?$`,
  'i'
);

const authMiddleware = auth((req) => {
  const reqUrlPathname = new URL(req.url)?.pathname;
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname);

  if (req.auth) {
    if (isAuthPage) {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/home?callbackUrl=${encodeURIComponent(
            reqUrlPathname
          )}`,
          req.url
        )
      );
    }

    return intlMiddleware(req);
  }

  if (!req.auth && reqUrlPathname !== '/') {
    if (isAuthPage) return intlMiddleware(req);

    return NextResponse.redirect(
      new URL(
        `http://localhost:3000/auth?callbackUrl=${encodeURIComponent(
          reqUrlPathname
        )}`,
        req.url
      )
    );
  }
});

export default authMiddleware;
