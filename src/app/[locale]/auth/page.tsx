import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { LoginForm } from '@/modules/auth/components/login';
import { AuthCard } from '@/modules/auth/components/ui';

export default function AuthPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={pick(messages, 'auth.login.form', 'form')}
    >
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </NextIntlClientProvider>
  );
}
