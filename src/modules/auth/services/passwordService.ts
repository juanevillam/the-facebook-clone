'use server';

import { hash } from 'bcryptjs';

import { db } from '@/lib/database/prismaClient';
import { sendResetPasswordEmail } from '@/lib/email/emailUtils';
import { getUserByEmail } from '@/lib/services/userService';
import { generatePasswordResetToken } from '@/lib/tokens/tokenGenerator';

import { getPasswordResetTokenByToken } from './passwordResetTokenService';
import {
  forgotPasswordFormSchema,
  forgotPasswordFormValuesType,
} from '../schemas/forgotPasswordSchema';
import {
  resetPasswordFormSchema,
  resetPasswordFormValuesType,
} from '../schemas/resetPasswordSchema';

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

export const resetPassword = async (
  values: resetPasswordFormValuesType,
  token: string
) => {
  if (!token) return { message: 'missing-token', type: 'error' };

  const validatedFields = resetPasswordFormSchema.safeParse(values);

  if (!validatedFields.success)
    return { message: 'invalid-fields', type: 'error' };

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { message: 'token-does-not-exist', type: 'error' };

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) return { message: 'token-has-expired', type: 'error' };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser)
    return { message: 'account-does-not-exist', type: 'error' };

  const { password } = validatedFields.data;

  const hashedPassword = await hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { message: 'password-updated', type: 'success' };
};
