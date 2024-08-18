'use client';

import { useOptimistic, useState, useTransition } from 'react';

import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import { Drawer } from 'vaul';

import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';

import { PostFooterActions } from './actions/PostFooterActions';
import { PostFooterInfo } from './info/PostFooterInfo';
import { likePost } from '../../../actions';
import { CommentExtended, LikeExtended } from '../../../assets/types';
import { PostCommentsBottomSheetBody } from '../comments/body/PostCommentsBottomSheetBody';
import { PostCommentsBottomSheet } from '../comments/bottom-sheet';
import { PostCommentsBottomSheetFooter } from '../comments/bottom-sheet/footer/PostCommentsBottomSheetFooter';

type PostFooterProps = {
  isPostModal?: boolean;
  postComments: CommentExtended[];
  postLikes: LikeExtended[];
  postId: string;
};

export const PostFooter = ({
  isPostModal,
  postComments,
  postLikes,
  postId,
}: PostFooterProps) => {
  const [isCommentsBottomSheetOpen, setIsCommentsBottomSheetOpen] =
    useState(false);

  const [isCommentsSectionOpen, setIsCommentsSectionOpen] = useState(false);

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

  const handleCommentsSection = () =>
    setIsCommentsSectionOpen(!isCommentsSectionOpen);

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
    <>
      {(optimisticLikes.length > 0 || optimisticComments.length > 0) && (
        <div className="md:px-4">
          <button
            className="only-mobile flex-center-justify-between primary-transition hover:primary-bg w-full px-3 py-2"
            onClick={openCommentsBottomSheet}
            type="button"
          >
            <PostFooterInfo
              isMyLike={isMyLike}
              optimisticComments={optimisticComments}
              optimisticLikes={optimisticLikes}
            />
          </button>
          <div className="only-desktop center-justify-between w-full px-0 py-3">
            <PostFooterInfo
              handleCommentsSection={handleCommentsSection}
              isMyLike={isMyLike}
              optimisticComments={optimisticComments}
              optimisticLikes={optimisticLikes}
            />
          </div>
        </div>
      )}
      <PostFooterActions
        handleCommentsSection={handleCommentsSection}
        handleOptimisticLike={handleOptimisticLike}
        isCommentsBottomSheetOpen={isCommentsBottomSheetOpen}
        isCommentsSectionOpen={isCommentsSectionOpen}
        isMyLike={isMyLike}
        isPostModal={isPostModal}
        openCommentsBottomSheet={openCommentsBottomSheet}
        optimisticLikes={optimisticLikes}
        postId={postId}
      />
      {isCommentsSectionOpen && (
        <div className="only-desktop border-l-4 border-primary-100 px-3 pt-4">
          <PostCommentsBottomSheetBody
            optimisticComments={optimisticComments}
          />
        </div>
      )}
      <div className="md:px-4">
        <div className="only-desktop space-x-2 pb-2 pt-4">
          <ProfilePic />
          <PostCommentsBottomSheetFooter
            addOptimisticComment={addOptimisticComment}
            postId={postId}
            setIsCommentsSectionOpen={setIsCommentsSectionOpen}
          />
        </div>
        <p className="only-desktop secondary-text ml-16 pb-4 text-xs">
          {t('posts.post.footer.comments.press-enter-to-post')}
        </p>
      </div>
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
    </>
  );
};
