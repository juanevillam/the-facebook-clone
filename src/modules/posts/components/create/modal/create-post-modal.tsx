import { Backdrop, Fade, Modal } from '@mui/material';

import { filePickerType, voidFunctionType } from '@/assets/types';
import { ArrowLeftIcon, CloseIcon } from '@/assets/ui/icons';
import { useAppSelector } from '@/lib/store/hooks';

import {
  CreatePostCheckIn,
  CreatePostFeelings,
  CreatePostFooter,
  CreatePostGifs,
  CreatePostHeader,
  CreatePostMedia,
  CreatePostTextArea,
  CreatePostUserInfo,
} from '../shared';

interface CreatePostModalProps {
  filePicker: filePickerType;
  handleStep: voidFunctionType;
  handleToggleCreatePostOpenable: voidFunctionType;
}

export const CreatePostModal = ({
  filePicker,
  handleStep,
  handleToggleCreatePostOpenable,
}: CreatePostModalProps) => {
  const { createPostOpenableOpen, step } = useAppSelector(
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
              Component: step === 'default' ? CloseIcon : ArrowLeftIcon,
              name: step === 'default' ? 'close' : 'back',
              onClick: handleStep,
            }}
          />
          {step === 'default' && (
            <>
              <CreatePostUserInfo />
              <CreatePostTextArea />
              <CreatePostFooter />
            </>
          )}
          {step === 'media' && <CreatePostMedia filePicker={filePicker} />}
          {step === 'feelings' && <CreatePostFeelings />}
          {step === 'check-in' && <CreatePostCheckIn />}
          {step === 'gifs' && <CreatePostGifs />}
        </div>
      </Fade>
    </Modal>
  );
};
