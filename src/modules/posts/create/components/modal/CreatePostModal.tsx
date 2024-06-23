import { Backdrop, Fade, Modal } from '@mui/material';

import { FileInputRef, VoidFunction } from '@/assets/types';
import { ArrowLeftIcon, CloseIcon } from '@/assets/ui/icons';
import { useAppSelector } from '@/lib/store/hooks';

import {
  CreatePostButton,
  CreatePostFooter,
  CreatePostHeader,
  CreatePostLoader,
  CreatePostTextArea,
  CreatePostUserInfo,
} from '../shared/layout';
import {
  CreatePostCheckIn,
  CreatePostFeelings,
  CreatePostGifs,
  CreatePostMedia,
} from '../shared/steps';

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
        return <CreatePostMedia fileInputRef={fileInputRef} />;
      case 'feelings':
        return <CreatePostFeelings />;
      case 'check-in':
        return <CreatePostCheckIn />;
      case 'gifs':
        return <CreatePostGifs />;
      case 'default':
      default:
        return (
          <>
            <CreatePostUserInfo />
            <CreatePostTextArea />
            <CreatePostFooter />
            <CreatePostButton />
            <CreatePostLoader />
          </>
        );
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
        <div className="absolute bg-white left-1/2 max-w-lg outline-none top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg w-full dark:bg-dark-100">
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
