import { MobileDialog } from '@/components';
import { useAppSelector } from '@/lib/store/hooks';

import { CreateStoryBody, CreateStoryHeader } from './layout';

type CreatePostDialogProps = {
  handleToggleOpenable: VoidFunction;
};

export const CreateStoryDialog = ({
  handleToggleOpenable,
}: CreatePostDialogProps) => {
  const { isOpenableOpen } = useAppSelector(
    (store) => store.stories.createStory.createStoryStory
  );

  return (
    <MobileDialog
      onDismiss={handleToggleOpenable}
      open={isOpenableOpen}
      translateFrom="y"
    >
      <div className="flex h-full flex-col">
        <CreateStoryHeader handleToggleOpenable={handleToggleOpenable} />
        <CreateStoryBody />
      </div>
    </MobileDialog>
  );
};
