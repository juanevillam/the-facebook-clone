'use client';

import { PostExtended } from '../../../types';
import { PostContent } from '../PostContent';

type PostPageProps = {
  post: PostExtended;
};

export const PostPage = ({ post }: PostPageProps) => (
  <div className="bg-card md:h-[calc(100vh-57px)]">
    <PostContent post={post} variant="page" />
  </div>
);
