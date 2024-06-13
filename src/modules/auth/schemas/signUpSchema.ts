import * as z from 'zod';

const minLengthValidation = z.string().min(1, 'form.validations.required');

const emailValidation = z.string().email('form.validations.email-address');

const passwordValidation = z
  .string()
  .min(8, 'form.validations.min')
  .regex(/[a-z]/, 'form.validations.password.lowercase')
  .regex(/[A-Z]/, 'form.validations.password.uppercase')
  .regex(/[0-9]/, 'form.validations.password.number');

const signUpFormSchema = z.object({
  name: minLengthValidation,
  email: emailValidation,
  password: passwordValidation,
  gender: minLengthValidation,
});

const signUpDialogFormSchema = {
  step1: z.object({
    name: minLengthValidation,
  }),
  step2: z.object({
    email: emailValidation,
  }),
  step3: z.object({
    password: passwordValidation,
  }),
  step4: z.object({
    gender: minLengthValidation,
  }),
};

export { signUpFormSchema, signUpDialogFormSchema };

export type signUpFormValuesType = z.infer<typeof signUpFormSchema>;
