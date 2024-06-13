'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/database';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
} from '@/lib/tokens';

import { loginFormSchema, loginFormValuesType } from '../schemas/loginSchema';

export const login = async (values: loginFormValuesType) => {
  const validatedFields = loginFormSchema.safeParse(values);

  if (!validatedFields.success)
    return { message: 'invalid-fields', type: 'error' };

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { message: 'account-does-not-exist', type: 'error' };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateEmailVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { message: 'confirmation-email-sent', type: 'success' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken)
        return { message: 'invalid-2fa-code', type: 'error' };

      if (twoFactorToken.token !== code)
        return {
          message: 'invalid-2fa-code',
          type: 'error',
        };

      const hasExpired = new Date() > new Date(twoFactorToken.expires);

      if (hasExpired) return { message: '2fa-code-has-expired', type: 'error' };

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation)
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return {
        twoFactor: true,
        type: 'success',
      };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { message: 'welcome-to-the-facebook-clone', type: 'success' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'invalid-credentials', type: 'error' };
        default:
          return { message: 'something-went-wrong', type: 'error' };
      }
    }

    throw error;
  }
};
