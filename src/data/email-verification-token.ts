import { db } from '@/lib/database';

const getEmailVerificationTokenByToken = async (token: string) => {
  try {
    const emailVerificationToken = await db.emailVerificationToken.findUnique({
      where: { token },
    });

    return emailVerificationToken;
  } catch {
    return null;
  }
};

const getEmailVerificationTokenByEmail = async (email: string) => {
  try {
    const emailVerificationToken = await db.emailVerificationToken.findFirst({
      where: { email },
    });

    return emailVerificationToken;
  } catch {
    return null;
  }
};

export { getEmailVerificationTokenByToken, getEmailVerificationTokenByEmail };
