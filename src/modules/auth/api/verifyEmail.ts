'use server';

import { getEmailVerificationTokenByToken } from '@/data/emailVerificationToken';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/database';

export const verifyEmail = async (token: string) => {
  if (!token) {
    return { message: 'missing-token', type: 'error' };
  }

  const existingToken = await getEmailVerificationTokenByToken(token);

  if (!existingToken) return { message: 'token-does-not-exist', type: 'error' };

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) return { message: 'token-has-expired', type: 'error' };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser)
    return { message: 'account-does-not-exist', type: 'error' };

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.emailVerificationToken.delete({ where: { id: existingToken.id } });

  return { message: 'email-verified', type: 'success' };
};
