import { Backdrop, Fade, Modal, Skeleton } from '@mui/material';

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
        <div className="card absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform overflow-hidden outline-none md:h-5/6 md:w-11/12">
          <div className="mx-auto flex h-full w-96 flex-col justify-center md:py-4">
            <Skeleton
              className="skeleton-bg !h-full rounded-xl"
              variant="rectangular"
              width="100%"
            />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
