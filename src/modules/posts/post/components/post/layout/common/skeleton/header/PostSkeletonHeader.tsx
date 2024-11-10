import { Skeleton } from '@mui/material';

export const PostSkeletonHeader = () => {
  return (
    <div className="flex space-x-2 p-3 md:px-4">
      <Skeleton
        className="skeleton-bg"
        height={40}
        variant="circular"
        width={40}
      />
      <div>
        <Skeleton className="skeleton-bg" height={20} width={120} />
        <Skeleton className="skeleton-bg" height={15} width={80} />
      </div>
    </div>
  );
};
