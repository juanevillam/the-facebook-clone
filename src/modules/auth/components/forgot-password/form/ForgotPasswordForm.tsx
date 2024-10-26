'use client';

import { useTransition } from 'react';

import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/buttons';
import { forgotPassword } from '@/modules/auth/api';
import {
  forgotPasswordFormSchema,
  forgotPasswordFormValuesType,
} from '@/modules/auth/schemas/forgotPasswordSchema';

import { EmailAuthTextInput } from '../../ui';

export const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();

  const handleSubmit = (values: forgotPasswordFormValuesType) => {
    startTransition(() => {
      forgotPassword(values)
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

  const handleValidateForm = (values: forgotPasswordFormValuesType) => {
    try {
      forgotPasswordFormSchema.parse(values);
    } catch (error) {
      if (error instanceof z.ZodError) return error.formErrors.fieldErrors;
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={handleSubmit}
      validate={handleValidateForm}
    >
      <Form className="pt-2">
        <EmailAuthTextInput disabled={isPending} />
        <Button
          disabled={isPending}
          fullWidth
          label={t('auth.forgot-password.form.primary-button.label')}
          loading={isPending}
          loadingLabel={t(
            'auth.forgot-password.form.primary-button.loading-label'
          )}
          type="submit"
          variant="primary"
        />
      </Form>
    </Formik>
  );
};
