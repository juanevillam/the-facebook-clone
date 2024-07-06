import { Backdrop, Fade, Modal } from '@mui/material';

import { VoidFunction } from '@/assets/types';
import { ArrowLeftIcon, CloseIcon } from '@/assets/ui/icons';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostHeader } from '../layout';

interface CreatePostModalProps {
  handleStep: VoidFunction;
  handleToggleOpenable: VoidFunction;
  children: React.ReactNode;
}

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
      className="hidden md:flex"
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
        <div className="card absolute left-1/2 max-w-lg outline-none top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <CreatePostHeader
            icon={{
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
