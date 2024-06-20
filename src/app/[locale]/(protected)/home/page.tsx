import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { signOut } from '@/auth';
import { CreatePostCard } from '@/modules/posts/components/create';

const HomePage = ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <div className="max-w-3xl mx-auto md:max-w-xl md:pt-4 lg:max-w-2xl">
      <NextIntlClientProvider
        messages={pick(
          messages,
          'posts.create',
          'images',
          'toast-messages.error',
          'icon-buttons'
        )}
      >
        <CreatePostCard />
      </NextIntlClientProvider>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <button className="text-black text-2xl dark:text-white" type="submit">
          Sign out
        </button>
      </form>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
      <h1 className="text-black text-2xl dark:text-white">Home</h1>
    </div>
  );
};

export default HomePage;
