'use client';

import { useEffect, useState, useTransition } from 'react';

import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/buttons';
import { useAppDispatch } from '@/lib/store/hooks';
import { login } from '@/modules/auth/api';
import { toggleSignUpOpenable } from '@/modules/auth/reducers/authReducer';
import {
  loginFormSchema,
  loginFormValuesType,
} from '@/modules/auth/schemas/loginSchema';

import {
  AuthLink,
  AuthSocial,
  AuthTextInput,
  EmailAuthTextInput,
} from '../../ui';

export const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'oauth-account-not-linked'
      : '';

  const t = useTranslations();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: loginFormValuesType) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data.type === 'success') {
            if (data.message === 'confirmation-email-sent') {
              showToast.success(t(`toast-messages.success.${data.message}`));
              return;
            }

            if (data.twoFactor) {
              setShowTwoFactor(true);
              return;
            }

            window.location.reload();
          } else if (data.message)
            showToast.error(t(`toast-messages.error.${data.message}`));
        })
        .catch(() =>
          showToast.error(t('toast-messages.error.something-went-wrong'))
        );
    });
  };

  const handleValidateForm = (values: loginFormValuesType) => {
    try {
      loginFormSchema.parse(values);
    } catch (error) {
      if (error instanceof z.ZodError) return error.formErrors.fieldErrors;
    }
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
          code: '',
        }}
        onSubmit={handleSubmit}
        validate={handleValidateForm}
      >
        <Form>
          {showTwoFactor ? (
            <AuthTextInput
              disabled={isPending}
              name="code"
              placeholder={t('form.fields.code')}
              type="text"
            />
          ) : (
            <>
              <EmailAuthTextInput disabled={isPending} />
              <AuthTextInput
                disabled={isPending}
                minLength={1}
                name="password"
                placeholder={t('form.fields.password')}
                type="password"
              />
            </>
          )}
          <Button
            disabled={isPending}
            fullWidth
            label={t(
              `auth.login.form.primary-button.${
                showTwoFactor ? '2fa-' : ''
              }label`
            )}
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
          <hr className="hidden w-full md:mb-4 md:block" />
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
