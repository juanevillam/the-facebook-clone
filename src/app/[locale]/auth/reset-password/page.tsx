import { Suspense } from 'react';

import { pick } from 'lodash';
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { SuspenseLoader } from '@/components';
import { ResetPasswordForm } from '@/modules/auth/components/reset-password';
import { AuthCard } from '@/modules/auth/components/ui';

export default function ResetPasswordPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();
  const t = useTranslations();

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <AuthCard
        info={{
          title: t('auth.reset-password.title'),
          description: t('auth.reset-password.description'),
        }}
        showChildrenOn="bottom"
      >
        <NextIntlClientProvider
          messages={pick(
            messages,
            'auth.reset-password',
            'auth.card',
            'form',
            'images',
            'toast-messages'
          )}
        >
          <ResetPasswordForm />
        </NextIntlClientProvider>
      </AuthCard>
    </Suspense>
  );
}
