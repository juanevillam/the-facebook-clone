import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';

export default function AuthPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  return (
    <main className="w-full md:w-5/12">
      <section className="bg-white md:rounded-lg md:shadow-lg">
        <div className="p-4">
          <h1 className="font-bold text-blue-600 text-2xl">AuthPage</h1>
        </div>
      </section>
    </main>
  );
}
