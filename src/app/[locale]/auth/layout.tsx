import { unstable_setRequestLocale } from 'next-intl/server';

import { LayoutProps } from '@/assets/types';
import { AuthFooter, AuthHeader } from '@/modules/auth/components/layout';

export default function AuthLayout({
  params: { locale },
  children,
}: LayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <main className="bg-white md:bg-smoke-100">
      <div className="h-screen flex flex-col justify-between">
        <section className="h-5/6 z-10 md:flex md:items-center md:max-w-4xl md:mx-auto md:px-6 md:space-x-12 md:w-full lg:max-w-5xl">
          <AuthHeader />
          {children}
        </section>
        <AuthFooter />
      </div>
    </main>
  );
}
