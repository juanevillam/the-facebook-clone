'use client';

import { PostExtended } from '../../../assets/types';
import { PostContent } from '../shared';

type PostPageProps = {
  post: PostExtended;
};

export const PostPage = ({ post }: PostPageProps) => {
  return (
    <div className="md:card-bg h-[calc(100vh-113px)] bg-black md:flex md:h-[calc(100vh-57px)] md:flex-row">
      <PostContent post={post} variant="page" />
    </div>
  );
};
