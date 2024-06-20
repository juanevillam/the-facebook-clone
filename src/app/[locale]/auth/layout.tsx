import { unstable_setRequestLocale } from 'next-intl/server';

import { LayoutProps } from '@/assets/types';
import { AuthFooter, AuthHeader } from '@/modules/auth/components/layout';

export default function AuthLayout({
  params: { locale },
  children,
}: LayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <main className="flex flex-col h-screen justify-between md:bg-gray-100">
      <section className="z-10 md:h-5/6 md:flex md:flex-row md:items-center md:max-w-4xl md:mx-auto md:px-6 md:space-x-12 lg:max-w-5xl">
        <AuthHeader />
        {children}
      </section>
      <AuthFooter />
    </main>
  );
}
