import { Skeleton } from '@mui/material';

export const StoryCardSkeleton = () => (
  <div
    className="h-full min-w-28 overflow-hidden rounded-xl md:min-w-32"
    role="listitem"
  >
    <Skeleton
      className="bg-skeleton h-full"
      variant="rectangular"
      width="100%"
    />
  </div>
);
