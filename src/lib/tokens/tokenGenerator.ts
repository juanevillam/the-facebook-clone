import crypto from 'crypto';

import { v4 as uuidv4 } from 'uuid';

import { db } from '@/lib/database/prismaClient';
import { getEmailVerificationTokenByEmail } from '@/modules/auth/services/emailVerificationTokenService';
import { getPasswordResetTokenByEmail } from '@/modules/auth/services/passwordResetTokenService';
import { getTwoFactorTokenByEmail } from '@/modules/auth/services/twoFactorTokenService';

const generateEmailVerificationToken = async (email: string) => {
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

const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 300 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 300 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export { generateEmailVerificationToken, generatePasswordResetToken };
