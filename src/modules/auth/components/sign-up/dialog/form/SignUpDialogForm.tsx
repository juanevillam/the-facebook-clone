import { useTransition } from 'react';

import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/buttons';
import { signUp } from '@/modules/auth/api';
import {
  signUpDialogFormSchema,
  signUpFormValuesType,
} from '@/modules/auth/schemas/signUpSchema';

import { AuthRadioInput, AuthTextInput } from '../../../ui';

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
          <AuthTextInput
            disabled={isPending}
            name="name"
            placeholder={t('form.fields.name')}
            type="text"
            variant="standard"
          />
        )}
        {step === 2 && (
          <AuthTextInput
            disabled={isPending}
            name="email"
            placeholder={t('form.fields.email-address')}
            type="email"
            variant="standard"
          />
        )}
        {step === 3 && (
          <AuthTextInput
            disabled={isPending}
            name="password"
            minLength={8}
            placeholder={t('form.fields.password')}
            type="password"
            variant="standard"
          />
        )}
        {step === 4 && (
          <div className="flex space-x-3" role="group">
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
