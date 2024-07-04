import { FileInputRef, VoidFunction } from '@/assets/types';
import { ArrowLeftIcon } from '@/assets/ui/icons';
import { MobileDialog } from '@/components/mobile';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostHeader } from '../layout';
import {
  CreatePostCheckInStep,
  CreatePostDefaultStep,
  CreatePostFeelingsStep,
  CreatePostGifsStep,
  CreatePostMediaStep,
} from '../steps';

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
