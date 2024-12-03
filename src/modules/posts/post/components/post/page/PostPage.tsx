'use client';

import { PostExtended } from '../../../types';
import { PostContent } from '../PostContent';

type PostPageProps = {
  post: PostExtended;
};

export const PostPage = ({ post }: PostPageProps) => (
  <div className="card-bg md:h-[calc(100vh-57px)]">
    <PostContent post={post} variant="page" />
  </div>
);
