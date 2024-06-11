import { useTransition } from 'react';

import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import * as z from 'zod';

import { Button } from '@/components/ui';
import {
  signUpFormSchema,
  signUpFormValuesType,
} from '@/modules/auth/schemas/signUpSchema';

import { AuthRadioInput, AuthTextInput } from '../../../ui';

export const SignUpModalForm = () => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();

  const handleValidateForm = (values: signUpFormValuesType) => {
    try {
      signUpFormSchema.parse(values);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.formErrors.fieldErrors;
      }
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
      onSubmit={(values: signUpFormValuesType) => {
        startTransition(() => {
          console.log(values);
        });
      }}
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
        <p className="mb-1 text-gray-700 text-xs" id="gender-label">
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
  );
};
