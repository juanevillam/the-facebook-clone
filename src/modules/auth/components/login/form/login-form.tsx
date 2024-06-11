'use client';

import React, { useTransition } from 'react';

import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/ui';
import { AuthLink, AuthTextInput } from '@/modules/auth/components/ui';
import {
  loginFormSchema,
  loginFormValuesType,
} from '@/modules/auth/schemas/loginSchema';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();

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
      console.log(values);
      showToast.error(t('toast-messages.error.invalid-fields'));
    });
  };

  return (
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
          onClick={() =>
            showToast.success(
              t('toast-messages.success.confirmation-email-sent')
            )
          }
          type="button"
          size="md"
          variant="secondary"
        />
      </Form>
    </Formik>
  );
};
