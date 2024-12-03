'use client';

import { useState } from 'react';

import { Drawer } from 'vaul';

import { DotsHorizontalIcon } from '@/assets/icons';
import { IconButton } from '@/components/buttons';
import { useAppSelector } from '@/lib/store/hooks';

import { PostCommentOptionsBottomSheet } from './PostCommentOptionsBottomSheet';

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
            ariaLabel: 'open-comment-options-menu',
            className: 'secondary-fill size-full',
            Component: DotsHorizontalIcon,
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
