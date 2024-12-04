'use client';

import { useTransition } from 'react';

import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/buttons';
import {
  signUpFormSchema,
  signUpFormValuesType,
} from '@/modules/auth/schemas/signUpSchema';

import { signUp } from '../../services/registrationService';
import {
  AuthRadioInput,
  AuthSocial,
  AuthTextInput,
  EmailAuthTextInput,
} from '../ui';

type SignUpModalFormProps = {
  handleToggleSignUpOpenable: VoidFunction;
};

export const SignUpModalForm = ({
  handleToggleSignUpOpenable,
}: SignUpModalFormProps) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();

  const handleSubmit = (values: signUpFormValuesType) => {
    startTransition(() => {
      signUp(values)
        .then((data) => {
          if (data.type === 'success') {
            showToast.success(t(`toast-messages.success.${data.message}`));
            handleToggleSignUpOpenable();
          } else showToast.error(t(`toast-messages.error.${data.message}`));
        })
        .catch(() =>
          showToast.error(t('toast-messages.error.something-went-wrong'))
        );
    });
  };

  const handleValidateForm = (values: signUpFormValuesType) => {
    try {
      signUpFormSchema.parse(values);
    } catch (error) {
      if (error instanceof z.ZodError) return error.formErrors.fieldErrors;
    }
  };

  return (
    <div className="px-1">
      <AuthSocial />
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          gender: '',
        }}
        onSubmit={handleSubmit}
        validate={handleValidateForm}
      >
        <Form>
          <AuthTextInput
            disabled={isPending}
            id="sign-up-modal-form-name-input"
            name="name"
            placeholder={t('form.fields.name')}
            skin="secondary"
            type="text"
          />
          <EmailAuthTextInput
            disabled={isPending}
            id="sign-up-modal-form-email-input"
            skin="secondary"
          />
          <AuthTextInput
            disabled={isPending}
            id="sign-up-modal-form-password-input"
            minLength={8}
            name="password"
            placeholder={t('form.fields.password')}
            skin="secondary"
            type="password"
          />
          <p
            aria-hidden="true"
            className="mb-1 text-xs text-gray-700"
            id="gender-label"
          >
            {t('form.fields.gender.label')}
          </p>
          <div
            aria-labelledby="gender-label"
            className="flex space-x-3"
            role="group"
          >
            <AuthRadioInput
              label={t('form.fields.gender.male')}
              name="gender"
              value="male"
            />
            <AuthRadioInput
              label={t('form.fields.gender.female')}
              name="gender"
              value="female"
            />
          </div>
          <Button
            fullWidth
            disabled={isPending}
            label={t('auth.sign-up.form.button.label')}
            loading={isPending}
            loadingLabel={t('auth.sign-up.form.button.loading-label')}
            type="submit"
            variant="secondary"
          />
        </Form>
      </Formik>
    </div>
  );
};
