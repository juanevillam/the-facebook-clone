import * as z from 'zod';

const minLengthValidation = z.string().min(1, 'form.validations.required');

const emailValidation = z.string().email('form.validations.email-address');

const passwordValidation = z
  .string()
  .min(8, 'form.validations.min')
  .regex(/[a-z]/, 'form.validations.password.lowercase')
  .regex(/[A-Z]/, 'form.validations.password.uppercase')
  .regex(/[0-9]/, 'form.validations.password.number');

export const signUpFormSchema = z.object({
  name: minLengthValidation,
  email: emailValidation,
  password: passwordValidation,
  gender: minLengthValidation,
});

export type signUpFormValuesType = z.infer<typeof signUpFormSchema>;
