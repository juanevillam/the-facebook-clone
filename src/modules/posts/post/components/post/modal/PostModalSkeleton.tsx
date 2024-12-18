import { Backdrop, Fade, Modal, Skeleton } from '@mui/material';

import { PostSkeletonHeader } from '../layout/shared/skeleton';

export const PostModalSkeleton = () => (
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
      <div className="card absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform outline-none md:h-5/6 md:w-11/12">
        <div className="flex h-full flex-col md:flex-row">
          <Skeleton
            className="bg-skeleton !h-4/5 md:!h-full md:rounded-bl-xl md:rounded-tl-xl"
            variant="rectangular"
            width="100%"
          />
          <div className="md:min-w-96">
            <PostSkeletonHeader />
            <div className="px-3 md:px-4">
              <Skeleton className="bg-skeleton" height={15} width="80%" />
              <Skeleton className="bg-skeleton" height={15} width="90%" />
              <Skeleton className="bg-skeleton" height={15} width="70%" />
            </div>
          </div>
        </div>
      </div>
    </Fade>
  </Modal>
);
