import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import { Drawer } from 'vaul';

import { TrashIcon } from '@/assets/icons';
import { ActionLoader } from '@/components';
import { useCurrentUser } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { deleteComment } from '@/modules/posts/post/actions';
import { toggleDeletingComment } from '@/modules/posts/post/reducers/postReducer';

import { PostCommentOptionsBottomSheetItem } from './PostCommentOptionsBottomSheetItem';

type PostCommentOptionsBottomSheetProps = {
  closeBottomSheet: VoidFunction;
  commentId: string;
  onDismiss: VoidFunction;
};

export const PostCommentOptionsBottomSheet = ({
  closeBottomSheet,
  onDismiss,
  commentId,
}: PostCommentOptionsBottomSheetProps) => {
  const t = useTranslations();
  const currentUser = useCurrentUser();
  const dispatch = useAppDispatch();
  const { deletingComment } = useAppSelector((store) => store.posts.postsPost);

  const handleDeleteComment = async () => {
    dispatch(toggleDeletingComment());

    try {
      const { message } = await deleteComment(
        commentId,
        currentUser?.id as string
      );

      showToast.success(t(`toast-messages.success.${message}`));
      closeBottomSheet();
      dispatch(toggleDeletingComment());
    } catch (error) {
      if (error instanceof Error) {
        showToast.error(t(`toast-messages.error.${error.message}`));
        closeBottomSheet();
        dispatch(toggleDeletingComment());
      }
    }
  };

  return (
    <Drawer.Portal>
      <Drawer.Overlay className="sheet-overlay" onClick={onDismiss} />
      <Drawer.Content className="sheet-content h-max">
        <Drawer.Handle className="sheet-handle" />
        <Drawer.Title className="sr-only">
          {t('posts.post.footer.comments.options.bottom-sheet.title')}
        </Drawer.Title>
        <Drawer.Description className="sr-only">
          {t('posts.post.footer.comments.options.bottom-sheet.description')}
        </Drawer.Description>
        <div className="rounded-lg py-1.5 md:p-3">
          <PostCommentOptionsBottomSheetItem
            IconComponent={TrashIcon}
            name="delete"
            onClick={handleDeleteComment}
          />
          <ActionLoader
            className="md:rounded-lg"
            message="deleting-comment"
            open={deletingComment}
          />
        </div>
      </Drawer.Content>
      <Drawer.Overlay />
    </Drawer.Portal>
  );
};
