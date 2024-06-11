import crypto from 'crypto';

import { v4 as uuidv4 } from 'uuid';

import { getEmailVerificationTokenByEmail } from '@/data/email-verification-token';
import { db } from '@/lib/database';

export const generateEmailVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 300 * 1000);
  const existingToken = await getEmailVerificationTokenByEmail(email);

  if (existingToken) {
    await db.emailVerificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const emailVerificationToken = await db.emailVerificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return emailVerificationToken;
};
