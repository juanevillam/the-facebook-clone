'use client';

import { useOptimistic, useState, useTransition } from 'react';

import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import { Drawer } from 'vaul';

import { LikeIcon } from '@/assets/ui/icons';
import { useCurrentUser } from '@/hooks';

import { PostFooterActions } from './actions/PostFooterActions';
import { likePost } from '../../../actions';
import { CommentExtended, LikeExtended } from '../../../assets/types';
import { PostCommentsBottomSheet } from '../comments/bottom-sheet';

type PostFooterProps = {
  media: string;
  postComments: CommentExtended[];
  postLikes: LikeExtended[];
  postId: string;
};

export const PostFooter = ({
  media,
  postComments,
  postLikes,
  postId,
}: PostFooterProps) => {
  const [isCommentsBottomSheetOpen, setIsCommentsBottomSheetOpen] =
    useState(false);

  const [isPending, startTransition] = useTransition();
  const t = useTranslations();
  const user = useCurrentUser();

  const isMyLike = (like: LikeExtended) =>
    like.userId === user?.id && like.postId === postId;

  const [optimisticLikes, addOptimisticLike] = useOptimistic<LikeExtended[]>(
    postLikes,
    // @ts-ignore
    (likes: LikeExtended[], newLike: LikeExtended) =>
      likes.some(isMyLike)
        ? likes.filter((like) => like.userId !== user?.id)
        : [...likes, newLike]
  );

  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentExtended[]
  >(
    postComments,
    // @ts-ignore
    (comments: CommentExtended[], newComment: CommentExtended) => [
      {
        postId,
        thoughts: newComment,
        user,
        userId: user?.id,
      },
      ...comments,
    ]
  );

  const openCommentsBottomSheet = () => setIsCommentsBottomSheetOpen(true);

  const closeCommentsBottomSheet = () => setIsCommentsBottomSheetOpen(false);

  const handleOptimisticLike = async () => {
    startTransition(() => addOptimisticLike({ postId, userId: user?.id }));

    try {
      await likePost(postId, user?.id as string);
    } catch (error) {
      error instanceof Error &&
        showToast.error(t(`toast-messages.error.${error.message}`));
    }
  };

  return (
    <div className="md:px-4">
      {(optimisticLikes.length > 0 || optimisticComments.length > 0) && (
        <button
          className="flex-center-justify-between primary-transition hover:primary-bg w-full px-3 py-2 md:px-0 md:py-3 md:hover:bg-transparent"
          onClick={openCommentsBottomSheet}
          type="button"
        >
          <div className="flex-center space-x-1.5">
            <LikeIcon className="size-4 md:size-5" />
            <p className="secondary-text text-sm md:hover:underline">
              {optimisticLikes.some(isMyLike) &&
                t('posts.post.footer.likes.you')}
              {!optimisticLikes.some(isMyLike) && optimisticLikes.length}
              {optimisticLikes.some(isMyLike) &&
                optimisticLikes.length > 1 &&
                ` ${t('posts.post.footer.likes.and')} ${optimisticLikes.length - 1} ${optimisticLikes.length > 2 ? t('posts.post.footer.likes.people') : t('posts.post.footer.likes.person')} ${t('posts.post.footer.likes.more')}`}
            </p>
          </div>
          {optimisticComments.length > 1 && (
            <p className="secondary-text text-sm md:hover:underline">
              {`${optimisticComments.length} `}
              {optimisticLikes.length === 1
                ? t('posts.post.footer.comments.comment')
                : t('posts.post.footer.comments.comments')}
            </p>
          )}
        </button>
      )}
      <PostFooterActions
        handleOptimisticLike={handleOptimisticLike}
        isCommentsBottomSheetOpen={isCommentsBottomSheetOpen}
        isMyLike={isMyLike}
        openCommentsBottomSheet={openCommentsBottomSheet}
        optimisticLikes={optimisticLikes}
        postId={postId}
        showBorderT={media ? optimisticLikes.length > 0 : true}
      />
      <Drawer.Root
        open={isCommentsBottomSheetOpen}
        onClose={closeCommentsBottomSheet}
      >
        <PostCommentsBottomSheet
          addOptimisticComment={addOptimisticComment}
          handleOptimisticLike={handleOptimisticLike}
          isMyLike={isMyLike}
          onDismiss={closeCommentsBottomSheet}
          optimisticComments={optimisticComments}
          optimisticLikes={optimisticLikes}
          postId={postId}
        />
      </Drawer.Root>
    </div>
  );
};
