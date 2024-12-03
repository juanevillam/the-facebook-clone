import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PostModalWrapper } from '@/modules/posts/post/components/post/modal';
import { fetchPost } from '@/modules/posts/post/services/postsService';

type PostModalPageProps = {
  params: {
    id: string;
    locale: string;
  };
};

const PostModalPage = async ({
  params: { id, locale },
}: PostModalPageProps) => {
  unstable_setRequestLocale(locale);

  const post = await fetchPost(id);

  if (!post) notFound();

  return <PostModalWrapper post={post} />;
};

export default PostModalPage;
