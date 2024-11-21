import { useOptimistic, useTransition } from 'react';

import { SavedPost } from '@prisma/client';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import { Drawer } from 'vaul';

import {
  BookmarkIcon,
  BookmarkSlashIcon,
  EyeIcon,
  TrashIcon,
} from '@/assets/ui/icons';
import { ActionLoader } from '@/components';
import { useCurrentUser } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { deletePost, savePost } from '@/modules/posts/post/actions';
import { toggleDeletingPost } from '@/modules/posts/post/reducers/headerOptionsSlice';
import { useRouter } from '@/navigation';

import { PostOptionsBottomSheetItem } from './item/PostOptionsBottomSheetItem';

type PostOptionsBottomSheetProps = {
  closeBottomSheet: VoidFunction;
  onDismiss: VoidFunction;
  postId: string;
  postSaves: SavedPost[];
  postUserId: string;
};

export const PostOptionsBottomSheet = ({
  closeBottomSheet,
  onDismiss,
  postId,
  postUserId,
  postSaves,
}: PostOptionsBottomSheetProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations();
  const currentUser = useCurrentUser();
  const dispatch = useAppDispatch();
  const { deletingPost } = useAppSelector(
    (store) => store.posts.post.headerOptions
  );

  const isPostMine = currentUser?.id === postUserId;

  const isMySave = (save: SavedPost) =>
    save.userId === currentUser?.id && save.postId === postId;

  const [optimisticSaves, addOptimisticSave] = useOptimistic<SavedPost[]>(
    postSaves,
    // @ts-ignore
    (saves: SavedPost[], newSave: SavedPost) =>
      saves.some(isMySave)
        ? saves.filter((save) => save.userId !== currentUser?.id)
        : [...saves, newSave]
  );

  const handleOptimisticSave = async () => {
    closeBottomSheet();
    startTransition(() =>
      addOptimisticSave({ postId, userId: currentUser?.id })
    );

    try {
      await savePost(postId, currentUser?.id as string);
    } catch (error) {
      error instanceof Error &&
        showToast.error(t(`toast-messages.error.${error.message}`));
    }
  };

  const handleViewPost = () => router.push(`/posts/${postId}` as any);

  const handleDeletePost = async () => {
    dispatch(toggleDeletingPost());

    try {
      const { message } = await deletePost(postId, currentUser?.id as string);

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

  return (
    <Drawer.Portal>
      <Drawer.Overlay className="bottom-sheet-overlay" onClick={onDismiss} />
      <Drawer.Content className="bottom-sheet-content h-max">
        <Drawer.Handle className="bottom-sheet-handle" />
        <Drawer.Title className="sr-only">
          {t('posts.post.options.bottom-sheet.title')}
        </Drawer.Title>
        <Drawer.Description className="sr-only">
          {t('posts.post.options.bottom-sheet.description')}
        </Drawer.Description>
        <div className="rounded-lg py-1.5 md:p-3">
          <PostOptionsBottomSheetItem
            IconComponent={
              optimisticSaves.some(isMySave) ? BookmarkSlashIcon : BookmarkIcon
            }
            name={optimisticSaves.some(isMySave) ? 'unsave' : 'save'}
            onClick={handleOptimisticSave}
            showDescription
          />
          <hr className="primary-border my-1.5 border-t md:my-2" />
          <PostOptionsBottomSheetItem
            IconComponent={EyeIcon}
            name="view"
            onClick={handleViewPost}
          />
          {isPostMine && (
            <>
              <hr className="primary-border my-1.5 border-t md:my-2" />
              <PostOptionsBottomSheetItem
                IconComponent={TrashIcon}
                name="delete"
                onClick={handleDeletePost}
                showDescription
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
