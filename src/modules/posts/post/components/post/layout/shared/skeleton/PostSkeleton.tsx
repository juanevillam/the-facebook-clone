import { Skeleton } from '@mui/material';

import { PostSkeletonHeader } from './PostSkeletonHeader';

export const PostSkeleton = () => (
  <div className="card pb-3 md:pb-6" role="listitem">
    <PostSkeletonHeader />
    <Skeleton
      className="bg-skeleton"
      variant="rectangular"
      height={384}
      width="100%"
    />
  </div>
);
