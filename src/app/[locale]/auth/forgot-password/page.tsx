import { pick } from 'lodash';
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { ForgotPasswordForm } from '@/modules/auth/components/forgot-password';
import { AuthCard } from '@/modules/auth/components/ui';

export default function ForgotPasswordPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();
  const t = useTranslations('auth.forgot-password');

  return (
    <AuthCard
      info={{
        title: t('title'),
        description: t('description'),
      }}
      showChildrenOn="bottom"
    >
      <NextIntlClientProvider
        messages={pick(
          messages,
          'auth.forgot-password',
          'auth.card',
          'form',
          'images',
          'toast-messages'
        )}
      >
        <ForgotPasswordForm />
      </NextIntlClientProvider>
    </AuthCard>
  );
}
