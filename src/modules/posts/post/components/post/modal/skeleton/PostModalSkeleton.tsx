import { Backdrop, Fade, Modal, Skeleton } from '@mui/material';

import { PostSkeletonHeader } from '../../layout/common/skeleton';

export const PostModalSkeleton = () => {
  return (
    <Modal
      className="z-40"
      closeAfterTransition
      open
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in>
        <div className="card absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform outline-none md:h-5/6 md:w-11/12">
          <div className="flex h-full flex-col md:flex-row">
            <Skeleton
              className="only-mobile skeleton-bg"
              variant="rectangular"
              height="80%"
              width="100%"
            />
            <Skeleton
              className="only-desktop skeleton-bg rounded-bl-xl rounded-tl-xl"
              variant="rectangular"
              height="100%"
              width="100%"
            />
            <div className="md:min-w-96">
              <PostSkeletonHeader />
              <div className="px-3 md:px-4">
                <Skeleton className="skeleton-bg" height={15} width="80%" />
                <Skeleton className="skeleton-bg" height={15} width="90%" />
                <Skeleton className="skeleton-bg" height={15} width="70%" />
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
