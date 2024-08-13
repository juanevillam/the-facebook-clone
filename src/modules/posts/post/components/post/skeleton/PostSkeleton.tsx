import { Skeleton } from '@mui/material';

export const PostSkeleton = () => {
  return (
    <div className="card pb-3 md:pb-6">
      <div className="flex-justify-between p-3 md:px-4 space-x-2">
        <div className="flex space-x-2">
          <Skeleton
            className="skeleton-bg"
            height={40}
            variant="circular"
            width={40}
          />
          <div>
            <Skeleton className="skeleton-bg" height={20} width={120} />
            <Skeleton className="skeleton-bg" height={20} width={80} />
          </div>
        </div>
      </div>
      <Skeleton
        className="skeleton-bg"
        variant="rectangular"
        height={384}
        width="100%"
      />
    </div>
  );
};
