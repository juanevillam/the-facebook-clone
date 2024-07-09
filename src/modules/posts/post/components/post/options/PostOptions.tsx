'use client';

import { useCallback, useOptimistic, useState, useTransition } from 'react';

import { SavedPost } from '@prisma/client';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import { Drawer } from 'vaul';

import {
  BookmarkIcon,
  BookmarkSlashIcon,
  DotsHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from '@/assets/ui/icons';
import { ActionLoader } from '@/components';
import { IconButton } from '@/components/buttons';
import { useCurrentUser } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { PostOptionsBottomSheet } from './bottom-sheet/PostOptionsBottomSheet';
import { PostOptionsDropDown } from './drop-down/PostOptionsDropDown';
import { PostOption } from './ui';
import { deletePost, savePost } from '../../../api';
import { toggleDeletingPost } from '../../../reducers/optionsSlice';

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
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const { deletingPost } = useAppSelector((store) => store.posts.post.options);
  const isPostMine = user?.id === postUserId;

  const isMySave = (save: SavedPost) =>
    save.userId === user?.id && save.postId === postId;

  const [optimisticSaves, addOptimisticSave] = useOptimistic<SavedPost[]>(
    postSaves,
    // @ts-ignore
    (saves: SavedPost[], newSave: SavedPost) =>
      saves.some(isMySave)
        ? saves.filter((save) => save.userId !== user?.id)
        : [...saves, newSave]
  );

  const openBottomSheet = () => setIsBottomSheetOpen(true);

  const closeBottomSheet = () => !deletingPost && setIsBottomSheetOpen(false);

  const handleToggleDropDown = useCallback(() => {
    !deletingPost && setIsDropDownOpen((prevState) => !prevState);
  }, [deletingPost]);

  const RenderOptions = () => {
    const dispatch = useAppDispatch();
    const t = useTranslations('toast-messages');

    const handleDeletePost = () => {
      dispatch(toggleDeletingPost());
      deletePost(postId, user?.id as string)
        .then((data) => {
          showToast.success(t(`success.${data.message}`));
          setIsBottomSheetOpen(false);
          setIsDropDownOpen(false);
          dispatch(toggleDeletingPost());
        })
        .catch(({ message }) => {
          showToast.error(t(`error.${message}`));
          setIsBottomSheetOpen(false);
          setIsDropDownOpen(false);
          dispatch(toggleDeletingPost());
        });
    };

    const handleOptimisticSave = () => {
      setIsBottomSheetOpen(false);
      setIsBottomSheetOpen(false);
      setIsDropDownOpen(false);
      startTransition(() => {
        addOptimisticSave({ postId, userId: user?.id });
      });

      savePost(postId, user?.id as string).catch(({ message }) =>
        showToast.error(t(`error.${message}`))
      );
    };

    return (
      <>
        <form onSubmit={handleOptimisticSave}>
          <PostOption
            IconComponent={
              optimisticSaves.some(isMySave) ? BookmarkSlashIcon : BookmarkIcon
            }
            name={optimisticSaves.some(isMySave) ? 'unsave' : 'save'}
            showDescription
          />
        </form>
        {isPostMine && (
          <>
            <hr className="border-t my-1.5 md:my-2 primary-border" />
            <PostOption IconComponent={PencilIcon} name="edit" />
            <form action={handleDeletePost}>
              <hr className="border-t my-1.5 md:my-2 primary-border" />
              <PostOption IconComponent={TrashIcon} name="delete" />
            </form>
          </>
        )}
        <ActionLoader
          className="md:rounded-lg"
          message="deleting-post"
          open={deletingPost}
        />
      </>
    );
  };

  return (
    <>
      <div className="only-mobile">
        <Drawer.Root open={isBottomSheetOpen} onClose={closeBottomSheet}>
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
          <PostOptionsBottomSheet onDismiss={closeBottomSheet}>
            <RenderOptions />
          </PostOptionsBottomSheet>
        </Drawer.Root>
      </div>
      <div className="hidden md:flex">
        <IconButton
          className="-mt-1 size-9 z-20 hover:primary-bg"
          icon={{
            className: 'secondary-fill size-full',
            Component: DotsHorizontalIcon,
            name: 'dots-horizontal',
          }}
          onClick={handleToggleDropDown}
        />
        <PostOptionsDropDown
          onDismiss={handleToggleDropDown}
          open={isDropDownOpen}
        >
          <RenderOptions />
        </PostOptionsDropDown>
      </div>
    </>
  );
};
