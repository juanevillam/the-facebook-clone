'use server';

import { hash } from 'bcryptjs';

import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/database';

import {
  resetPasswordFormSchema,
  resetPasswordFormValuesType,
} from '../schemas/resetPasswordSchema';

export const resetPassword = async (
  values: resetPasswordFormValuesType,
  token: string
) => {
  if (!token) {
    return { message: 'missing-token', type: 'error' };
  }

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
