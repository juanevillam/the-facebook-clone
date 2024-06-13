import * as z from 'zod';

export const forgotPasswordFormSchema = z.object({
  email: z.string().email('form.validations.email-address'),
});

export type forgotPasswordFormValuesType = z.infer<
  typeof forgotPasswordFormSchema
>;
