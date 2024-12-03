import { Backdrop, Fade, Modal } from '@mui/material';

import { ArrowLeftIcon, CloseIcon } from '@/assets/icons';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostHeader } from './layout';

type CreatePostModalProps = {
  handleStep: VoidFunction;
  handleToggleOpenable: VoidFunction;
  children: React.ReactNode;
};

export const CreatePostModal = ({
  handleStep,
  handleToggleOpenable,
  children,
}: CreatePostModalProps) => {
  const { isOpenableOpen, step } = useAppSelector(
    (store) => store.posts.createPost.createPostPost
  );

  return (
    <Modal
      className="only-desktop"
      closeAfterTransition
      onClose={handleToggleOpenable}
      open={isOpenableOpen}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpenableOpen}>
        <div className="card absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform outline-none">
          <CreatePostHeader
            icon={{
              ariaLabel: step === 'default' ? 'close-create-post' : 'go-back',
              Component: step === 'default' ? CloseIcon : ArrowLeftIcon,
              onClick: handleStep,
            }}
          />
          {children}
        </div>
      </Fade>
    </Modal>
  );
};
