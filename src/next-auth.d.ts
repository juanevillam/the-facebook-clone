import type { Session, User } from 'next-auth';

declare module 'next-auth' {
  interface User {
    username?: string | null;
  }
}
