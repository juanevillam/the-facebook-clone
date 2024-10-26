import { Backdrop, Fade, Modal } from '@mui/material';

import { ArrowLeftIcon, CloseIcon } from '@/assets/ui/icons';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostHeader } from '../layout';

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
    (store) => store.posts.create.post
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
            Icon={{
              Component: step === 'default' ? CloseIcon : ArrowLeftIcon,
              name: step === 'default' ? 'close' : 'back',
              onClick: handleStep,
            }}
          />
          {children}
        </div>
      </Fade>
    </Modal>
  );
};
