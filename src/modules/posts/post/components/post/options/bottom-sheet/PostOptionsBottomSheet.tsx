import { useOptimistic, useTransition } from 'react';

import { SavedPost } from '@prisma/client';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import { Drawer } from 'vaul';

import { VoidFunction } from '@/assets/types';
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  PencilIcon,
  TrashIcon,
} from '@/assets/ui/icons';
import { ActionLoader } from '@/components';
import { useCurrentUser } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { deletePost, savePost } from '@/modules/posts/post/actions';
import { toggleDeletingPost } from '@/modules/posts/post/reducers/optionsSlice';

import { PostOptionsBottomSheetItem } from './item/PostOptionsBottomSheetItem';

interface PostOptionsBottomSheetProps {
  closeBottomSheet: VoidFunction;
  onDismiss: VoidFunction;
  postId: string;
  postSaves: SavedPost[];
  postUserId: string;
}

export const PostOptionsBottomSheet = ({
  closeBottomSheet,
  onDismiss,
  postId,
  postUserId,
  postSaves,
}: PostOptionsBottomSheetProps) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();
  const user = useCurrentUser();
  const dispatch = useAppDispatch();
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

  const handleDeletePost = async () => {
    dispatch(toggleDeletingPost());

    try {
      const { message } = await deletePost(postId, user?.id as string);

      showToast.success(t(`toast-messages.success.${message}`));
      closeBottomSheet();
      dispatch(toggleDeletingPost());
    } catch (error) {
      if (error instanceof Error) {
        showToast.error(t(`toast-messages.error.${error.message}`));
        closeBottomSheet();
        dispatch(toggleDeletingPost());
      }
    }
  };

  const handleOptimisticSave = async () => {
    closeBottomSheet();
    startTransition(() => addOptimisticSave({ postId, userId: user?.id }));

    try {
      await savePost(postId, user?.id as string);
    } catch (error) {
      if (error instanceof Error)
        showToast.error(t(`toast-messages.error.${error.message}`));
    }
  };

  return (
    <Drawer.Portal>
      <Drawer.Overlay className="bottom-sheet-overlay" onClick={onDismiss} />
      <Drawer.Content className="bottom-sheet-content h-max md:h-5/6">
        <Drawer.Handle className="bottom-sheet-handle" />
        <Drawer.Title className="sr-only">
          {t('posts.post.options.bottom-sheet.title')}
        </Drawer.Title>
        <Drawer.Description className="sr-only">
          {t('posts.post.options.bottom-sheet.description')}
        </Drawer.Description>
        <div className="py-1.5 md:p-3 rounded-lg">
          <PostOptionsBottomSheetItem
            IconComponent={
              optimisticSaves.some(isMySave) ? BookmarkSlashIcon : BookmarkIcon
            }
            name={optimisticSaves.some(isMySave) ? 'unsave' : 'save'}
            onClick={handleOptimisticSave}
            showDescription
          />
          {isPostMine && (
            <>
              <hr className="border-t my-1.5 md:my-2 primary-border" />
              <PostOptionsBottomSheetItem
                IconComponent={PencilIcon}
                name="edit"
                onClick={() => console.log('edit')}
              />
              <hr className="border-t my-1.5 md:my-2 primary-border" />
              <PostOptionsBottomSheetItem
                IconComponent={TrashIcon}
                name="delete"
                onClick={handleDeletePost}
              />
            </>
          )}
          <ActionLoader
            className="md:rounded-lg"
            message="deleting-post"
            open={deletingPost}
          />
        </div>
      </Drawer.Content>
      <Drawer.Overlay />
    </Drawer.Portal>
  );
};
