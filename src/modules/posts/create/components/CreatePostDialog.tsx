import { ArrowLeftIcon } from '@/assets/icons';
import { MobileDialog } from '@/components';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostHeader } from './layout';

type CreatePostDialogProps = {
  handleStep: VoidFunction;
  children: React.ReactNode;
};

export const CreatePostDialog = ({
  handleStep,
  children,
}: CreatePostDialogProps) => {
  const { isOpenableOpen } = useAppSelector(
    (store) => store.posts.createPost.createPostPost
  );

  return (
    <MobileDialog
      open={isOpenableOpen}
      titleId="create-post-title"
      translateFrom="y"
    >
      <div className="flex h-full flex-col">
        <CreatePostHeader
          icon={{
            ariaLabel: 'close-create-post',
            Component: ArrowLeftIcon,
            onClick: handleStep,
          }}
        />
        {children}
      </div>
    </MobileDialog>
  );
};
