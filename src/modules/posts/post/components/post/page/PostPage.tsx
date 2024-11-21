'use client';

import { PostExtended } from '../../../assets/types';
import { PostContent } from '../shared';

type PostPageProps = {
  post: PostExtended;
};

export const PostPage = ({ post }: PostPageProps) => {
  return (
    <div className="card-bg md:h-[calc(100vh-57px)]">
      <PostContent post={post} variant="page" />
    </div>
  );
};
