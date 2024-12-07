import { Suspense } from 'react';

import { pick } from 'lodash';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { CreatePostCard } from '@/modules/posts/create/components';
import { Posts, PostsSkeleton } from '@/modules/posts/post/components/posts';
import { fetchPosts } from '@/modules/posts/post/services/postsService';
import {
  Stories,
  StoriesSkeleton,
} from '@/modules/stories/story/components/stories';
import { fetchStories } from '@/modules/stories/story/services/storiesService';

export default async function ProtectedPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();
  const stories = await fetchStories();
  const posts = await fetchPosts();

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
          'video-player',
          'media-picker',
          'logos',
          'links'
        )}
      >
        <CreatePostCard />
        <Suspense fallback={<StoriesSkeleton />}>
          <Stories stories={stories} />
        </Suspense>
        <Suspense fallback={<PostsSkeleton />}>
          <Posts posts={posts} />
        </Suspense>
      </NextIntlClientProvider>
    </div>
  );
}
