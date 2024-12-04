import { useTransition } from 'react';

import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/buttons';
import {
  signUpDialogFormSchema,
  signUpFormValuesType,
} from '@/modules/auth/schemas/signUpSchema';

import { signUp } from '../../services/registrationService';
import { AuthRadioInput, AuthTextInput, EmailAuthTextInput } from '../ui';

type SignUpDialogFormProps = {
  nextStep: VoidFunction;
  step: number;
};

export const SignUpDialogForm = ({ nextStep, step }: SignUpDialogFormProps) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();

  const handleSubmit = (values: signUpFormValuesType) => {
    step === 4
      ? startTransition(() => {
          signUp(values)
            .then((data) => {
              if (data.type === 'success') {
                showToast.success(t(`toast-messages.success.${data.message}`));
                nextStep();
              } else showToast.error(t(`toast-messages.error.${data.message}`));
            })
            .catch(() =>
              showToast.error(t('toast-messages.error.something-went-wrong'))
            );
        })
      : nextStep();
  };

  const handleValidateForm = (values: signUpFormValuesType) => {
    try {
      (signUpDialogFormSchema as any)[`step${step}`].parse(values);
    } catch (error) {
      if (error instanceof z.ZodError) return error.formErrors.fieldErrors;
    }
  };

  return (
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
        {step === 1 && (
          <>
            <label htmlFor="name" className="sr-only">
              {t('form.fields.name')}
            </label>
            <AuthTextInput
              disabled={isPending}
              id="sign-up-dialog-form-name-input"
              name="name"
              placeholder={t('form.fields.name')}
              type="text"
              variant="mobile"
            />
          </>
        )}
        {step === 2 && (
          <>
            <label htmlFor="email" className="sr-only">
              {t('form.fields.email-address')}
            </label>
            <EmailAuthTextInput
              disabled={isPending}
              id="sign-up-dialog-form-email-input"
              variant="mobile"
            />
          </>
        )}
        {step === 3 && (
          <>
            <label htmlFor="password" className="sr-only">
              {t('form.fields.password')}
            </label>
            <AuthTextInput
              disabled={isPending}
              id="sign-up-dialog-form-password-input"
              name="password"
              minLength={8}
              placeholder={t('form.fields.password')}
              type="password"
              variant="mobile"
            />
          </>
        )}
        {step === 4 && (
          <>
            <legend className="sr-only" id="gender-group-label">
              {t('form.fields.gender.label')}
            </legend>
            <fieldset
              aria-labelledby="gender-group-label"
              className="flex space-x-3"
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
            </fieldset>
          </>
        )}
        <Button
          fullWidth
          disabled={isPending}
          label={
            step === 4
              ? t('auth.sign-up.form.button.label')
              : t('auth.sign-up.dialog.next')
          }
          loading={isPending}
          loadingLabel={t('auth.sign-up.form.button.loading-label')}
          size="sm"
          type="submit"
          variant="primary"
        />
      </Form>
    </Formik>
  );
};
