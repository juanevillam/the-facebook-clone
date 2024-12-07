import { unstable_setRequestLocale } from 'next-intl/server';

import { LayoutProps } from '@/assets/types';
import { AuthFooter, AuthHeader } from '@/modules/auth/components/layout';

export default function AuthLayout({
  params: { locale },
  children,
}: LayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <main className="flex h-screen flex-col bg-gray-100 transition-colors duration-300 dark:bg-neutral-900">
      <section
        aria-labelledby="auth-layout-title"
        className="z-10 md:mx-auto md:flex md:h-5/6 md:max-w-4xl md:flex-row md:items-center md:space-x-12 md:px-6 lg:max-w-5xl"
      >
        <AuthHeader />
        {children}
      </section>
      <AuthFooter />
    </main>
  );
}
