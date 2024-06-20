import { ArrowLeftIcon } from '@/assets/ui/icons';
import { MobileDialog } from '@/components/mobile';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostHeader } from '../shared';

interface CreatePostDialogProps {
  handleStep: () => void;
}

export const CreatePostDialog = ({ handleStep }: CreatePostDialogProps) => {
  const { createPostOpenableOpen } = useAppSelector(
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
        CreatePostDialog
      </div>
    </MobileDialog>
  );
};
