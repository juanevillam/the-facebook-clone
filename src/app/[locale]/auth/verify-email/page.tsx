import { Suspense } from 'react';

import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { SuspenseLoader } from '@/components';
import { VerifyEmailForm } from '@/modules/auth/components/verify-email';

export default function VerifyEmailPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <NextIntlClientProvider
        messages={pick(
          messages,
          'auth.verify-email',
          'auth.card',
          'images',
          'toast-messages'
        )}
      >
        <VerifyEmailForm />
      </NextIntlClientProvider>
    </Suspense>
  );
}
