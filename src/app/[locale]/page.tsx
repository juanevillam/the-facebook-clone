import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';

export default function Root({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  return <main>Root</main>;
}
