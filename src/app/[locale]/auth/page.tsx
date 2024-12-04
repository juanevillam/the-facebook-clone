import { Suspense } from 'react';

import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { SuspenseLoader } from '@/components';
import { LoginForm } from '@/modules/auth/components/login';
import { SignUpDialog, SignUpModal } from '@/modules/auth/components/sign-up';
import { AuthCard } from '@/modules/auth/components/ui';

export default function AuthPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <NextIntlClientProvider
        messages={pick(
          messages,
          'auth.login',
          'auth.sign-up',
          'form',
          'images',
          'toast-messages',
          'icon-buttons',
          'auth.social'
        )}
      >
        <AuthCard>
          <LoginForm />
        </AuthCard>
        <SignUpDialog />
        <SignUpModal />
      </NextIntlClientProvider>
    </Suspense>
  );
}
