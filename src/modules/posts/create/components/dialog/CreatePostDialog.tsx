import { FileInputRef, VoidFunction } from '@/assets/types';
import { ArrowLeftIcon } from '@/assets/ui/icons';
import { MobileDialog } from '@/components/mobile';
import { useAppSelector } from '@/lib/store/hooks';

import {
  CreatePostFooter,
  CreatePostHeader,
  CreatePostTextArea,
  CreatePostUserInfo,
} from '../shared/layout';
import {
  CreatePostCheckIn,
  CreatePostFeelings,
  CreatePostGifs,
  CreatePostMedia,
} from '../shared/steps';

interface CreatePostDialogProps {
  fileInputRef: FileInputRef;
  handleStep: VoidFunction;
}

export const CreatePostDialog = ({
  fileInputRef,
  handleStep,
}: CreatePostDialogProps) => {
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
          </>
        );
    }
  };

  return (
    <MobileDialog open={isOpenableOpen} translateFrom="y">
      <div className="flex flex-col h-full">
        <CreatePostHeader
          icon={{
            Component: ArrowLeftIcon,
            onClick: handleStep,
            name: 'back',
          }}
        />
        {renderStepContent()}
      </div>
    </MobileDialog>
  );
};
