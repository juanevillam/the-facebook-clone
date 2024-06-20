import { Backdrop, Fade, Modal } from '@mui/material';

import { useAppSelector } from '@/lib/store/hooks';

interface CreatePostModalProps {
  handleToggleCreatePostOpenable: () => void;
}

export const CreatePostModal = ({
  handleToggleCreatePostOpenable,
}: CreatePostModalProps) => {
  const { createPostOpenableOpen } = useAppSelector(
    (store) => store.postsReducer
  );

  return (
    <Modal
      className="hidden md:flex"
      closeAfterTransition
      onClose={handleToggleCreatePostOpenable}
      open={createPostOpenableOpen}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={createPostOpenableOpen}>
        <div className="absolute bg-white left-1/2 max-w-lg outline-none top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg w-full dark:bg-dark-100">
          CreatePostModal
        </div>
      </Fade>
    </Modal>
  );
};
