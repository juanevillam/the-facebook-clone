import { Backdrop, Fade, Modal } from '@mui/material';

import { FileInputRef, VoidFunction } from '@/assets/types';
import { ArrowLeftIcon, CloseIcon } from '@/assets/ui/icons';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostHeader } from '../layout';
import {
  CreatePostCheckInStep,
  CreatePostDefaultStep,
  CreatePostFeelingsStep,
  CreatePostGifsStep,
  CreatePostMediaStep,
} from '../steps';

interface CreatePostModalProps {
  fileInputRef: FileInputRef;
  handleStep: VoidFunction;
  handleToggleOpenable: VoidFunction;
}

export const CreatePostModal = ({
  fileInputRef,
  handleStep,
  handleToggleOpenable,
}: CreatePostModalProps) => {
  const { isOpenableOpen, step } = useAppSelector(
    (store) => store.posts.create.post
  );

  const renderStepContent = () => {
    switch (step) {
      case 'media':
        return <CreatePostMediaStep fileInputRef={fileInputRef} />;
      case 'feelings':
        return <CreatePostFeelingsStep />;
      case 'check-in':
        return <CreatePostCheckInStep />;
      case 'gifs':
        return <CreatePostGifsStep />;
      case 'default':
      default:
        return <CreatePostDefaultStep />;
    }
  };

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
          {renderStepContent()}
        </div>
      </Fade>
    </Modal>
  );
};
