import { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUserByEmail } from './data/user';
import { loginFormSchema } from './modules/auth/schemas/loginSchema';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
