'use client';

import { useOptimistic, useState } from 'react';

import { Comment, Like } from '@prisma/client';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import { Drawer } from 'vaul';

import { LikeIcon } from '@/assets/ui/icons';
import { useCurrentUser } from '@/hooks';

import { PostFooterActions } from './actions/PostFooterActions';
import { likePost } from '../../../api';
import { comments } from '../../../assets/types';
import { PostCommentsBottomSheet } from '../comments/bottom-sheet';

interface PostFooterProps {
  media: string;
  postComments: Comment[];
  postLikes: Like[];
  postId: string;
}

export const PostFooter = ({
  media,
  postComments,
  postLikes,
  postId,
}: PostFooterProps) => {
  const [isCommentsBottomSheetOpen, setIsCommentsBottomSheetOpen] =
    useState(false);

  const user = useCurrentUser();
  const tLikes = useTranslations('posts.post.footer.likes');
  const tComments = useTranslations('posts.post.footer.comments');
  const tErrorToastMessages = useTranslations('toast-messages.error');

  const isMyLike = (like: Like) =>
    like.userId === user?.id && like.postId === postId;

  const [optimisticLikes, addOptimisticLike] = useOptimistic<Like[]>(
    postLikes,
    // @ts-ignore
    (likes: Like[], newLike: Like) =>
      likes.some(isMyLike)
        ? likes.filter((like) => like.userId !== user?.id)
        : [...likes, newLike]
  );

  const [optimisticComments, addOptimisticComment] = useOptimistic<comments[]>(
    postComments,
    // @ts-ignore
    (comments: Comment[], newComment: Comment) => [
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

  const handleOptimisticLike = () => {
    addOptimisticLike({ postId, userId: user?.id });
    likePost(postId, user?.id as string).catch(({ message }) =>
      showToast.error(tErrorToastMessages(message))
    );
  };

  return (
    <div className="md:px-4">
      {(optimisticLikes.length > 0 || optimisticComments.length > 0) && (
        <button
          className="flex-center-justify-between primary-transition py-2 md:py-3 px-3 md:px-0 w-full hover:primary-bg"
          onClick={openCommentsBottomSheet}
          type="button"
        >
          <div className="flex-center space-x-1.5">
            <LikeIcon className="size-4 md:size-5" />
            <p className="secondary-text text-sm">
              {optimisticLikes.some(isMyLike) && tLikes('you')}
              {!optimisticLikes.some(isMyLike) && optimisticLikes.length}
              {optimisticLikes.some(isMyLike) &&
                optimisticLikes.length > 1 &&
                ` ${tLikes('and')} ${optimisticLikes.length - 1} ${optimisticLikes.length > 2 ? tLikes('people') : tLikes('person')} ${tLikes('more')}`}
            </p>
          </div>
          {optimisticComments.length > 1 && (
            <p className="secondary-text text-sm">
              {`${optimisticComments.length} `}
              {optimisticLikes.length === 1
                ? tComments('comment')
                : tComments('comments')}
            </p>
          )}
        </button>
      )}
      <PostFooterActions
        handleOptimisticLike={handleOptimisticLike}
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
          userId={user?.id as string}
        />
      </Drawer.Root>
    </div>
  );
};
