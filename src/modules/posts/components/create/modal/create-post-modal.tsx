import { Backdrop, Fade, Modal } from '@mui/material';

import { CloseIcon } from '@/assets/ui/icons';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostHeader } from '../shared';

interface CreatePostModalProps {
  handleStep: () => void;
  handleToggleCreatePostOpenable: () => void;
}

export const CreatePostModal = ({
  handleStep,
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
          <CreatePostHeader
            icon={{
              Component: CloseIcon,
              name: 'close',
              onClick: handleStep,
            }}
          />
          CreatePostModal
        </div>
      </Fade>
    </Modal>
  );
};
