'use client';

import { useState } from 'react';

import { SavedPost } from '@prisma/client';
import classNames from 'classnames';
import { Drawer } from 'vaul';

import { DotsHorizontalIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { useAppSelector } from '@/lib/store/hooks';

import { PostOptionsBottomSheet } from './bottom-sheet/PostOptionsBottomSheet';

type PostOptionsProps = {
  isPostModal?: boolean;
  postId: string;
  postSaves: SavedPost[];
  postUserId: string;
};

export const PostOptions = ({
  isPostModal = false,
  postId,
  postSaves,
  postUserId,
}: PostOptionsProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { deletingPost } = useAppSelector(
    (store) => store.posts.post.headerOptions
  );

  const openBottomSheet = () => setIsBottomSheetOpen(true);

  const closeBottomSheet = () => setIsBottomSheetOpen(false);

  const closeBottomSheetAvailable = () => !deletingPost && closeBottomSheet();

  return (
    <Drawer.Root open={isBottomSheetOpen} onClose={closeBottomSheetAvailable}>
      <Drawer.Trigger asChild>
        <IconButton
          className={classNames({
            'hover:primary-bg -mt-1 size-9': !isPostModal,
            'size-10 bg-neutral-900 bg-opacity-50 hover:bg-neutral-700 hover:bg-opacity-50':
              isPostModal,
          })}
          icon={{
            className: classNames({
              'secondary-fill size-full': !isPostModal,
              'fill-white size-full': isPostModal,
            }),
            Component: DotsHorizontalIcon,
            name: 'dots-horizontal',
          }}
          onClick={openBottomSheet}
        />
      </Drawer.Trigger>
      <PostOptionsBottomSheet
        closeBottomSheet={closeBottomSheet}
        onDismiss={closeBottomSheetAvailable}
        postId={postId}
        postSaves={postSaves}
        postUserId={postUserId}
      />
    </Drawer.Root>
  );
};
