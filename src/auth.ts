import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { getTwoFactorConfirmationByUserId } from './data/twoFactorConfirmation';
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

      if (token.username && session.user) {
        session.user.username = token.username as string;
      }

      return session;
    },
    async jwt({ account, token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      if (account?.provider !== 'credentials' && !existingUser.username) {
        await db.user.update({
          where: { id: existingUser.id },
          data: {
            username: existingUser.name?.split(' ').join('').toLowerCase(),
          },
        });
      }

      token.username = existingUser.username;

      return token;
    },
    async signIn({ account, user }) {
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

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
