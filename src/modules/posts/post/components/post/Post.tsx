import { auth } from '@/auth';

import { PostBody, PostFooter, PostHeader } from './layout';
import { PostExtended } from '../../types';

export const Post = async (post: PostExtended) => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <article className="card" role="listitem">
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostFooter post={post} variant="page" />
    </article>
  );
};
