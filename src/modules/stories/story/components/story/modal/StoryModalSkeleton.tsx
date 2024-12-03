import { Backdrop, Fade, Modal, Skeleton } from '@mui/material';

import { PostSkeletonHeader } from '@/modules/posts/post/components/post/layout/shared/skeleton';

export const StoryModalSkeleton = () => {
  return (
    <Modal
      className="!z-30"
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
        <div className="card absolute left-1/2 top-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 transform flex-col overflow-hidden outline-none md:h-5/6 md:w-11/12 md:flex-row md:rounded-lg md:py-6">
          <div className="relative mx-auto size-full overflow-hidden md:w-96 md:rounded-xl">
            <PostSkeletonHeader />
            <Skeleton
              className="skeleton-placeholder absolute inset-0 h-full"
              variant="rectangular"
            />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
