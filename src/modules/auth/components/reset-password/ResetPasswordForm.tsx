'use client';

import { useTransition } from 'react';

import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/buttons';
import {
  resetPasswordFormSchema,
  resetPasswordFormValuesType,
} from '@/modules/auth/schemas/resetPasswordSchema';

import { resetPassword } from '../../services/passwordService';
import { AuthTextInput } from '../ui';

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const t = useTranslations();

  const handleSubmit = (values: resetPasswordFormValuesType) => {
    startTransition(() => {
      if (!token) {
        showToast.error(t('toast-messages.error.missing-token'));
        return;
      }

      resetPassword(values, token)
        .then((data) => {
          data.type === 'success'
            ? showToast.success(t(`toast-messages.success.${data.message}`))
            : showToast.error(t(`toast-messages.error.${data.message}`));
        })
        .catch(() =>
          showToast.error(t('toast-messages.error.something-went-wrong'))
        );
    });
  };

  const handleValidateForm = (values: resetPasswordFormValuesType) => {
    try {
      resetPasswordFormSchema.parse(values);
    } catch (error) {
      if (error instanceof z.ZodError) return error.formErrors.fieldErrors;
    }
  };

  return (
    <Formik
      initialValues={{
        password: '',
      }}
      onSubmit={handleSubmit}
      validate={handleValidateForm}
    >
      <Form className="pt-2">
        <h1 className="sr-only" id="reset-password-form-title">
          {t('auth.reset-password.title')}
        </h1>
        <p className="sr-only" id="reset-password-form-instructions">
          {t('auth.reset-password.description')}
        </p>
        <AuthTextInput
          ariaDescribedBy="reset-password-form-instructions"
          disabled={isPending}
          id="reset-password-password-input"
          minLength={8}
          name="password"
          placeholder={t('form.fields.password')}
          type="password"
        />
        <Button
          disabled={isPending}
          fullWidth
          label={t('auth.reset-password.form.primary-button.label')}
          loading={isPending}
          loadingLabel={t(
            'auth.reset-password.form.primary-button.loading-label'
          )}
          type="submit"
          variant="primary"
        />
      </Form>
    </Formik>
  );
};
