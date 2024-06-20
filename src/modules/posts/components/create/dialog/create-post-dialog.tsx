import { ArrowLeftIcon } from '@/assets/ui/icons';
import { MobileDialog } from '@/components/mobile';
import { useAppSelector } from '@/lib/store/hooks';

import {
  CreatePostHeader,
  CreatePostTextArea,
  CreatePostUserInfo,
} from '../shared';

interface CreatePostDialogProps {
  handleStep: () => void;
}

export const CreatePostDialog = ({ handleStep }: CreatePostDialogProps) => {
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
          </div>
        )}
        CreatePostDialog
      </div>
    </MobileDialog>
  );
};
