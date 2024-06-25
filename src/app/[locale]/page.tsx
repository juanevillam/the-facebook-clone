import { redirect } from 'next/navigation';

import { PageProps } from '@/assets/types';
import { getRedirectPath } from '@/utils';
import { localeType } from '@/utils/getRedirectPath';

export default async function RootPage({ params: { locale } }: PageProps) {
  redirect(`/${locale}${getRedirectPath(locale as localeType)}`);
}
