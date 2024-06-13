import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { VerifyEmailForm } from '@/modules/auth/components/verify-email';

export default function VerifyEmailPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
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
  );
}
