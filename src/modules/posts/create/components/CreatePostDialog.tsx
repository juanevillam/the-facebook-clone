import { ArrowLeftIcon } from '@/assets/icons';
import { MobileDialog } from '@/components';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostHeader } from './layout';

type CreatePostDialogProps = {
  handleStep: VoidFunction;
  handleToggleOpenable: VoidFunction;
  children: React.ReactNode;
};

export const CreatePostDialog = ({
  handleStep,
  handleToggleOpenable,
  children,
}: CreatePostDialogProps) => {
  const { isOpenableOpen } = useAppSelector(
    (store) => store.posts.createPost.createPostPost
  );

  return (
    <MobileDialog
      onDismiss={handleToggleOpenable}
      open={isOpenableOpen}
      translateFrom="y"
    >
      <div className="flex h-full flex-col">
        <CreatePostHeader
          Icon={{
            Component: ArrowLeftIcon,
            onClick: handleStep,
            name: 'back',
          }}
        />
        {children}
      </div>
    </MobileDialog>
  );
};
