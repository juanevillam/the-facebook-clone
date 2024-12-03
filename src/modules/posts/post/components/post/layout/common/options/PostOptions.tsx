'use client';

import { useState } from 'react';

import { SavedPost } from '@prisma/client';
import classNames from 'classnames';
import { Drawer } from 'vaul';

import { DotsHorizontalIcon } from '@/assets/icons';
import { IconButton } from '@/components/buttons';
import { useBreakpoint } from '@/hooks';
import { useAppSelector } from '@/lib/store/hooks';

import { PostOptionsBottomSheet } from './PostOptionsBottomSheet';

type PostOptionsProps = {
  isModal?: boolean;
  postId: string;
  postSaves: SavedPost[];
  postUserId: string;
};

export const PostOptions = ({
  isModal = false,
  postId,
  postSaves,
  postUserId,
}: PostOptionsProps) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const { deletingPost } = useAppSelector((store) => store.posts.postsPost);

  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';

  const openBottomSheet = () => setBottomSheetOpen(true);

  const closeBottomSheet = () => setBottomSheetOpen(false);

  const closeBottomSheetAvailable = () => !deletingPost && closeBottomSheet();

  return (
    <Drawer.Root open={bottomSheetOpen} onClose={closeBottomSheetAvailable}>
      <Drawer.Trigger asChild>
        <IconButton
          className={classNames('hover:primary-bg -mt-1 size-9', {
            'size-10 bg-neutral-900/50 hover:bg-neutral-700/50':
              isModal && isMobile,
          })}
          icon={{
            className: classNames('secondary-fill size-full', {
              '!fill-white': isModal && isMobile,
            }),
            Component: DotsHorizontalIcon,
            name: 'more-options',
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
