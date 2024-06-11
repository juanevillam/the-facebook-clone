import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { db } from './lib/database';

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
