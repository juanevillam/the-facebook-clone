import { NextRequest } from 'next/server';

import { locales } from './i18n/config';
import authMiddleware, {
  authPathnameRegex,
} from './middlewares/authMiddleware';
import intlMiddleware from './middlewares/intlMiddleware';
import { authRoutes, publicRoutes, API_AUTH_PREFIX } from './routes';

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${[...publicRoutes, ...authRoutes]
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );

  const isApiAuthRoute = req.nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname);

  if (isApiAuthRoute) return null;

  if (isPublicPage) {
    if (isAuthPage) return (authMiddleware as any)(req);

    return intlMiddleware(req);
  } else return (authMiddleware as any)(req);
}

export const config = {
  matcher: ['/', '/(en|es)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
