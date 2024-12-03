'use client';

import { useState } from 'react';

import { Drawer } from 'vaul';

import { DotsHorizontalIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { useAppSelector } from '@/lib/store/hooks';

import { PostCommentOptionsBottomSheet } from './bottom-sheet/PostCommentOptionsBottomSheet';

type PostCommentOptionsProps = {
  commentId: string;
};

export const PostCommentOptions = ({ commentId }: PostCommentOptionsProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { deletingComment } = useAppSelector((store) => store.posts.postsPost);

  const openBottomSheet = () => setIsBottomSheetOpen(true);

  const closeBottomSheet = () => setIsBottomSheetOpen(false);

  const closeBottomSheetAvailable = () =>
    !deletingComment && closeBottomSheet();

  return (
    <Drawer.Root open={isBottomSheetOpen} onClose={closeBottomSheetAvailable}>
      <Drawer.Trigger asChild>
        <IconButton
          className="hover:primary-bg -mt-1 size-9"
          icon={{
            className: 'secondary-fill size-full',
            Component: DotsHorizontalIcon,
            name: 'more-options',
          }}
          onClick={openBottomSheet}
        />
      </Drawer.Trigger>
      <PostCommentOptionsBottomSheet
        closeBottomSheet={closeBottomSheet}
        commentId={commentId}
        onDismiss={closeBottomSheetAvailable}
      />
    </Drawer.Root>
  );
};
