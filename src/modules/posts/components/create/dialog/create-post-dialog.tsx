import { filePickerType, voidFunctionType } from '@/assets/types';
import { ArrowLeftIcon } from '@/assets/ui/icons';
import { MobileDialog } from '@/components/mobile';
import { useAppSelector } from '@/lib/store/hooks';

import {
  CreatePostCheckIn,
  CreatePostFeelings,
  CreatePostFooter,
  CreatePostHeader,
  CreatePostMedia,
  CreatePostTextArea,
  CreatePostUserInfo,
} from '../shared';

interface CreatePostDialogProps {
  filePicker: filePickerType;
  handleStep: voidFunctionType;
}

export const CreatePostDialog = ({
  filePicker,
  handleStep,
}: CreatePostDialogProps) => {
  const { createPostOpenableOpen, step } = useAppSelector(
    (store) => store.postsReducer
  );

  return (
    <MobileDialog open={createPostOpenableOpen} translateFrom="y">
      <div className="flex flex-col h-full">
        <CreatePostHeader
          icon={{
            Component: ArrowLeftIcon,
            onClick: handleStep,
            name: 'back',
          }}
        />
        {step === 'default' && (
          <div className="flex flex-col flex-grow">
            <CreatePostUserInfo />
            <CreatePostTextArea />
            <CreatePostFooter />
          </div>
        )}
        {step === 'media' && <CreatePostMedia filePicker={filePicker} />}
        {step === 'feelings' && <CreatePostFeelings />}
        {step === 'check-in' && <CreatePostCheckIn />}
      </div>
    </MobileDialog>
  );
};
