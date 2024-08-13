'use client';

import { useState } from 'react';

import { SavedPost } from '@prisma/client';
import { Drawer } from 'vaul';

import { DotsHorizontalIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { useAppSelector } from '@/lib/store/hooks';

import { PostOptionsBottomSheet } from './bottom-sheet/PostOptionsBottomSheet';

interface PostOptionsProps {
  postId: string;
  postSaves: SavedPost[];
  postUserId: string;
}

export const PostOptions = ({
  postId,
  postSaves,
  postUserId,
}: PostOptionsProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { deletingPost } = useAppSelector((store) => store.posts.post.options);

  const openBottomSheet = () => setIsBottomSheetOpen(true);

  const closeBottomSheet = () => setIsBottomSheetOpen(false);

  const closeBottomSheetAvailable = () => !deletingPost && closeBottomSheet();

  return (
    <Drawer.Root open={isBottomSheetOpen} onClose={closeBottomSheetAvailable}>
      <Drawer.Trigger asChild>
        <IconButton
          className="-mt-1 size-9 hover:primary-bg"
          icon={{
            className: 'secondary-fill size-full',
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
