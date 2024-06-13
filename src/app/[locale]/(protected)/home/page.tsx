import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { signOut } from '@/auth';

const HomePage = ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="max-w-lg mx-auto lg:max-w-2xl md:max-w-lg md:pt-4">
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default HomePage;
