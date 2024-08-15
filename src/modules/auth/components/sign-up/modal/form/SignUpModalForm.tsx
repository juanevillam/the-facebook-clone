import { useTransition } from 'react';

import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/buttons';
import { signUp } from '@/modules/auth/api';
import {
  signUpFormSchema,
  signUpFormValuesType,
} from '@/modules/auth/schemas/signUpSchema';

import { AuthRadioInput, AuthSocial, AuthTextInput } from '../../../ui';

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
    <div className="space-y-4 px-1">
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
            name="name"
            placeholder={t('form.fields.name')}
            type="text"
            variant="outlined"
            varianttype="secondary"
          />
          <AuthTextInput
            disabled={isPending}
            name="email"
            placeholder={t('form.fields.email-address')}
            type="email"
            variant="outlined"
            varianttype="secondary"
          />
          <AuthTextInput
            disabled={isPending}
            minLength={8}
            name="password"
            placeholder={t('form.fields.password')}
            type="password"
            variant="outlined"
            varianttype="secondary"
          />
          <p className="mb-1 text-xs text-gray-700" id="gender-label">
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
