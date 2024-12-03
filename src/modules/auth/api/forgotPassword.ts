'use server';

import { sendResetPasswordEmail } from '@/lib/email/emailUtils';
import { getUserByEmail } from '@/lib/services/userService';
import { generatePasswordResetToken } from '@/lib/tokens/tokenGenerator';

import {
  forgotPasswordFormSchema,
  forgotPasswordFormValuesType,
} from '../schemas/forgotPasswordSchema';

export const forgotPassword = async (values: forgotPasswordFormValuesType) => {
  const validatedFields = forgotPasswordFormSchema.safeParse(values);

  if (!validatedFields.success)
    return { message: 'invalid-fields', type: 'error' };

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser)
    return { message: 'account-does-not-exist', type: 'error' };

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { message: 'reset-email-sent', type: 'success' };
};
