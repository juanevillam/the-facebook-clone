'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

import { loginFormSchema, loginFormValuesType } from '../schemas/loginSchema';

export const login = async (values: loginFormValuesType) => {
  const validatedFields = loginFormSchema.safeParse(values);

  if (!validatedFields.success)
    return { message: 'invalid-fields', type: 'error' };

  const { email, password } = validatedFields.data;

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
