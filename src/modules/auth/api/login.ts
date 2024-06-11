'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateEmailVerificationToken } from '@/lib/tokens';

import { loginFormSchema, loginFormValuesType } from '../schemas/loginSchema';

export const login = async (values: loginFormValuesType) => {
  const validatedFields = loginFormSchema.safeParse(values);

  if (!validatedFields.success)
    return { message: 'invalid-fields', type: 'error' };

  const { email, password } = validatedFields.data;

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
