import { Suspense } from 'react';

import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { signOut } from '@/auth';
import { CreatePostCard } from '@/modules/posts/create/components';
import { Posts, PostsSkeleton } from '@/modules/posts/post/components';

const ProtectedPage = ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <div className="mx-auto max-w-3xl space-y-1.5 md:max-w-xl md:space-y-4 md:pt-4 lg:max-w-2xl">
      <NextIntlClientProvider
        messages={pick(
          messages,
          'posts',
          'images',
          'toast-messages',
          'icon-buttons',
          'search-input',
          'action-loader',
          'timestamp'
        )}
      >
        <CreatePostCard />
        <Suspense fallback={<PostsSkeleton />}>
          <Posts />
        </Suspense>
      </NextIntlClientProvider>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <button className="text-2xl text-black dark:text-white" type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
};

export default ProtectedPage;
