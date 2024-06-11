import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { getUserById } from './data/user';
import { db } from './lib/database';

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  pages: {
    signIn: '/en/auth',
    error: '/en/auth/error',
  },
  ...authConfig,
});
