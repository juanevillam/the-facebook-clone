'use server';

import { hash } from 'bcryptjs';

import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/database';
import { sendVerificationEmail } from '@/lib/mail';
import { generateEmailVerificationToken } from '@/lib/tokens';

import {
  signUpFormSchema,
  signUpFormValuesType,
} from '../schemas/signUpSchema';

export const signUp = async (values: signUpFormValuesType) => {
  const validatedFields = signUpFormSchema.safeParse(values);

  if (!validatedFields.success)
    return { message: 'invalid-fields', type: 'error' };

  const { name, email, password, gender } = validatedFields.data;
  const hashedPassword = await hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { message: 'email-already-in-use', type: 'error' };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      gender,
    },
  });

  const verificationToken = await generateEmailVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { message: 'confirmation-email-sent', type: 'success' };
};
