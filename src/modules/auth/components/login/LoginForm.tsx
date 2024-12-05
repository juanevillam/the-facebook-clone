'use client';

import { useEffect, useState, useTransition } from 'react';

import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/buttons';
import { useAppDispatch } from '@/lib/store/hooks';
import { toggleSignUpOpenable } from '@/modules/auth/reducers/authReducer';
import {
  loginFormSchema,
  loginFormValuesType,
} from '@/modules/auth/schemas/loginSchema';

import { login } from '../../services/authenticationService';
import { AuthLink, AuthSocial, AuthTextInput, EmailAuthTextInput } from '../ui';

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
    if (urlError) {
      showToast.error(t(`toast-messages.error.${urlError}`), {
        id: 'oauth-account-not-linked',
      });
    }
  }, [urlError, t]);

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
        <Form aria-labelledby="login-form-title">
          <h1 className="sr-only hidden" id="login-form-title">
            {t('auth.login.title')}
          </h1>
          {showTwoFactor ? (
            <AuthTextInput
              disabled={isPending}
              id="login-form-code-input"
              name="code"
              placeholder={t('form.fields.code')}
              type="text"
            />
          ) : (
            <>
              <EmailAuthTextInput
                disabled={isPending}
                id="login-form-email-input"
              />
              <AuthTextInput
                disabled={isPending}
                id="login-form-password-input"
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
            label={
              showTwoFactor
                ? t('auth.login.form.primary-button.2fa-label')
                : t('auth.login.form.primary-button.label')
            }
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
          <div className="mx-auto w-max">
            <Button
              disabled={isPending}
              label={t('auth.login.form.secondary-button')}
              onClick={handleToggleSignUpOpenable}
              type="button"
              size="md"
              variant="secondary"
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
