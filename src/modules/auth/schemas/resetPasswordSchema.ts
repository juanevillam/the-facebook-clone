import * as z from 'zod';

export const resetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, 'form.validations.min')
    .regex(/[a-z]/, 'form.validations.password.lowercase')
    .regex(/[A-Z]/, 'form.validations.password.uppercase')
    .regex(/[0-9]/, 'form.validations.password.number'),
});

export type resetPasswordFormValuesType = z.infer<
  typeof resetPasswordFormSchema
>;
