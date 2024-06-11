import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { LoginForm } from '@/modules/auth/components/login';
import { SignUpDialog, SignUpModal } from '@/modules/auth/components/sign-up';
import { AuthCard } from '@/modules/auth/components/ui';

export default function AuthPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={pick(
        messages,
        'auth.login.form',
        'auth.sign-up',
        'form',
        'images',
        'toast-messages',
        'icon-buttons'
      )}
    >
      <AuthCard>
        <LoginForm />
      </AuthCard>
      <SignUpDialog />
      <SignUpModal />
    </NextIntlClientProvider>
  );
}
