import { Suspense } from 'react';

import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { CreatePostCard } from '@/modules/posts/create/components';
import { Posts, PostsSkeleton } from '@/modules/posts/post/components/posts';
import {
  Stories,
  StoriesSkeleton,
} from '@/modules/stories/story/components/stories';

const ProtectedPage = ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <div className="mx-auto max-w-3xl space-y-1.5 pb-1.5 md:max-w-xl md:space-y-4 md:pb-4 md:pt-4 lg:max-w-2xl">
      <NextIntlClientProvider
        messages={pick(
          messages,
          'posts',
          'stories',
          'images',
          'toast-messages',
          'icon-buttons',
          'search-input',
          'action-loader',
          'timestamp',
          'video-player'
        )}
      >
        <CreatePostCard />
        <Suspense fallback={<StoriesSkeleton />}>
          <Stories />
        </Suspense>
        <Suspense fallback={<PostsSkeleton />}>
          <Posts />
        </Suspense>
      </NextIntlClientProvider>
    </div>
  );
};

export default ProtectedPage;
