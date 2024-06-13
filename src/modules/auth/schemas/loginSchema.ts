import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('form.validations.email-address'),
  password: z.string().min(1, 'form.validations.required'),
  code: z.optional(z.string()),
});

export type loginFormValuesType = z.infer<typeof loginFormSchema>;
