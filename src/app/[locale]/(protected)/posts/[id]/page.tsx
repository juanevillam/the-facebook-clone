import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

import { DynamicPageProps } from '@/assets/types';
import { PostPageWrapper } from '@/modules/posts/post/components/post/page';
import { fetchPost } from '@/modules/posts/post/services/postsService';

const PostPage = async ({ params: { id, locale } }: DynamicPageProps) => {
  unstable_setRequestLocale(locale);

  const post = await fetchPost(id);

  if (!post) notFound();

  return <PostPageWrapper post={post} />;
};

export default PostPage;
