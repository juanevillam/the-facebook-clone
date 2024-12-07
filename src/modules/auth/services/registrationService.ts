'use server';

import { hash } from 'bcryptjs';

import { db } from '@/lib/database/prismaClient';
import { sendVerificationEmail } from '@/lib/email/emailUtils';
import { getUserByEmail } from '@/lib/services/userService';
import { generateEmailVerificationToken } from '@/lib/tokens/tokenGenerator';

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
      username: name.split(' ').join('').toLowerCase(),
      email,
      password: hashedPassword,
      gender,
    },
  });

  const verificationToken = await generateEmailVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { message: 'confirmation-email-sent', type: 'success' };
};
