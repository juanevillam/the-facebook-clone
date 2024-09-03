import { Backdrop, Fade, Modal, Skeleton } from '@mui/material';

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
          <div className="pb-3 md:pb-6">
            <div className="flex-justify-between space-x-2 p-3 md:px-4">
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
              height={584}
              width="100%"
            />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
