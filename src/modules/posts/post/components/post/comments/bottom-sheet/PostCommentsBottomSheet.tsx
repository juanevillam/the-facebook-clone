import { useTranslations } from 'next-intl';
import { Drawer } from 'vaul';

import { VoidFunction } from '@/assets/types';
import {
  CommentExtended,
  LikeExtended,
} from '@/modules/posts/post/assets/types';

import { PostCommentsBottomSheetFooter } from './footer/PostCommentsBottomSheetFooter';
import { PostCommentsBottomSheetHeader } from './header/PostCommentsBottomSheetHeader';
import { PostCommentsBottomSheetBody } from '../body/PostCommentsBottomSheetBody';

interface PostCommentsBottomSheetProps {
  addOptimisticComment: (action: unknown) => void;
  handleOptimisticLike: VoidFunction;
  isMyLike: (like: LikeExtended) => boolean;
  onDismiss: VoidFunction;
  optimisticComments: CommentExtended[];
  optimisticLikes: LikeExtended[];
  postId: string;
}

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
      <Drawer.Overlay className="bottom-sheet-overlay" onClick={onDismiss} />
      <Drawer.Content className="bottom-sheet-content h-full md:h-5/6">
        <Drawer.Title className="sr-only">{t('title')}</Drawer.Title>
        <Drawer.Description className="sr-only">
          {t('description')}
        </Drawer.Description>
        <div className="flex flex-col h-full">
          <Drawer.Handle className="bottom-sheet-handle" />
          <PostCommentsBottomSheetHeader
            handleOptimisticLike={handleOptimisticLike}
            isMyLike={isMyLike}
            optimisticLikes={optimisticLikes}
          />
          <PostCommentsBottomSheetBody
            optimisticComments={optimisticComments}
          />
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
