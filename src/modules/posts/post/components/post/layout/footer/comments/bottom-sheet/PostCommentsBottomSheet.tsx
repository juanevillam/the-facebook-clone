import { useTranslations } from 'next-intl';
import { Drawer } from 'vaul';

import { CommentExtended, LikeExtended } from '@/modules/posts/post/types';

import { PostComments } from '../PostComments';
import { PostCommentsBottomSheetFooter } from './PostCommentsBottomSheetFooter';
import { PostCommentsBottomSheetHeader } from './PostCommentsBottomSheetHeader';

type PostCommentsBottomSheetProps = {
  addOptimisticComment: (action: unknown) => void;
  handleOptimisticLike: VoidFunction;
  isMyLike: (like: LikeExtended) => boolean;
  onDismiss: VoidFunction;
  optimisticComments: CommentExtended[];
  optimisticLikes: LikeExtended[];
  postId: string;
};

export const PostCommentsBottomSheet = ({
  addOptimisticComment,
  handleOptimisticLike,
  isMyLike,
  onDismiss,
  optimisticComments,
  optimisticLikes,
  postId,
}: PostCommentsBottomSheetProps) => {
  const t = useTranslations('posts.post.comments.bottom-sheet');

  return (
    <Drawer.Portal>
      <Drawer.Overlay className="sheet-overlay" onClick={onDismiss} />
      <Drawer.Content className="sheet-content h-full md:h-[576px]">
        <Drawer.Title className="sr-only">{t('title')}</Drawer.Title>
        <Drawer.Description className="sr-only">
          {t('description')}
        </Drawer.Description>
        <div className="flex h-full flex-col">
          <Drawer.Handle className="sheet-handle" />
          <PostCommentsBottomSheetHeader
            handleOptimisticLike={handleOptimisticLike}
            isMyLike={isMyLike}
            optimisticLikes={optimisticLikes}
          />
          <PostComments optimisticComments={optimisticComments} />
          <PostCommentsBottomSheetFooter
            addOptimisticComment={addOptimisticComment}
            postId={postId}
          />
        </div>
      </Drawer.Content>
      <Drawer.Overlay />
    </Drawer.Portal>
  );
};
