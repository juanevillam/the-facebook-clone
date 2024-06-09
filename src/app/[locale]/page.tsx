import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';

export default function Root({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <h1 className="font-bold text-blue-600 text-2xl">Root</h1>
    </main>
  );
}
