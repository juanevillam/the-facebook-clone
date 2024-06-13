'use client';

import React, { useEffect, useTransition } from 'react';

import { Formik, Form } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/ui';
import { useAppDispatch } from '@/lib/store/hooks';
import { toggleSignUpOpenable } from '@/lib/store/reducers/auth-reducer';
import { login } from '@/modules/auth/api/login';
import {
  AuthLink,
  AuthSocial,
  AuthTextInput,
} from '@/modules/auth/components/ui';
import {
  loginFormSchema,
  loginFormValuesType,
} from '@/modules/auth/schemas/loginSchema';
import { getRedirectPath } from '@/modules/auth/utils';
import { localeType } from '@/modules/auth/utils/getRedirectPath';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'oauth-account-not-linked'
      : '';

  const t = useTranslations();
  const dispatch = useAppDispatch();

  const handleValidateForm = (values: loginFormValuesType) => {
    try {
      loginFormSchema.parse(values);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const handleSubmit = (values: loginFormValuesType) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data.type === 'success') {
            if (data.message === 'confirmation-email-sent') {
              showToast.success(t(`toast-messages.success.${data.message}`));
              return;
            }

            router.push(`/${locale}${getRedirectPath(locale as localeType)}`);
            showToast.success(t(`toast-messages.success.${data.message}`));
          } else showToast.error(t(`toast-messages.error.${data.message}`));
        })
        .catch(() =>
          showToast.error(t('toast-messages.error.something-went-wrong'))
        );
    });
  };

  const handleToggleSignUpOpenable = () => dispatch(toggleSignUpOpenable());

  useEffect(() => {
    if (urlError)
      showToast.error(t(`toast-messages.error.${urlError}`), {
        id: 'oauth-account-not-linked',
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlError]);

  return (
    <div className="space-y-4">
      <AuthSocial />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validate={handleValidateForm}
      >
        <Form>
          <AuthTextInput
            disabled={isPending}
            name="email"
            placeholder={t('form.fields.email-address')}
            type="email"
            variant="outlined"
          />
          <AuthTextInput
            disabled={isPending}
            minLength={1}
            name="password"
            placeholder={t('form.fields.password')}
            type="password"
            variant="outlined"
          />
          <Button
            disabled={isPending}
            fullWidth
            label={t('auth.login.form.primary-button.label')}
            loading={isPending}
            loadingLabel={t('auth.login.form.primary-button.loading-label')}
            type="submit"
            variant="primary"
          />
          <div className="flex justify-center py-6 md:py-4">
            <AuthLink
              label={t('auth.login.form.link')}
              navigateTo="auth/forgot-password"
            />
          </div>
          <hr className="hidden w-full md:block md:mb-4" />
          <Button
            disabled={isPending}
            label={t('auth.login.form.secondary-button')}
            onClick={handleToggleSignUpOpenable}
            type="button"
            size="md"
            variant="secondary"
          />
        </Form>
      </Formik>
    </div>
  );
};
