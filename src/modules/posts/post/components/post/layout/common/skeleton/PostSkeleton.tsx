import { Skeleton } from '@mui/material';

import { PostSkeletonHeader } from './header/PostSkeletonHeader';

export const PostSkeleton = () => {
  return (
    <div className="card pb-3 md:pb-6">
      <PostSkeletonHeader />
      <Skeleton
        className="skeleton-bg"
        variant="rectangular"
        height={384}
        width="100%"
      />
    </div>
  );
};
