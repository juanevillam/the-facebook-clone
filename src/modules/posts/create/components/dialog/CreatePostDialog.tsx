import { VoidFunction } from '@/assets/types';
import { ArrowLeftIcon } from '@/assets/ui/icons';
import { MobileDialog } from '@/components/mobile';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostHeader } from '../layout';

interface CreatePostDialogProps {
  handleStep: VoidFunction;
  handleToggleOpenable: VoidFunction;
  children: React.ReactNode;
}

export const CreatePostDialog = ({
  handleStep,
  handleToggleOpenable,
  children,
}: CreatePostDialogProps) => {
  const { isOpenableOpen } = useAppSelector((store) => store.posts.create.post);

  return (
    <MobileDialog
      onDismiss={handleToggleOpenable}
      open={isOpenableOpen}
      translateFrom="y"
    >
      <div className="flex flex-col h-full">
        <CreatePostHeader
          icon={{
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
