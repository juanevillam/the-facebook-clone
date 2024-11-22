'use client';

import { useOptimistic, useState, useTransition } from 'react';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import { Drawer } from 'vaul';

import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { likePost } from '@/modules/posts/post/actions';
import {
  CommentExtended,
  LikeExtended,
} from '@/modules/posts/post/assets/types';

import { PostFooterActions } from './actions/PostFooterActions';
import {
  PostComments,
  PostCommentsBottomSheet,
  PostCommentsBottomSheetFooter,
} from './comments';
import { PostFooterInfo } from './info/PostFooterInfo';
import { PostLikesBottomSheet } from './likes';

type PostFooterProps = {
  isPage?: boolean;
  isPostContent?: boolean;
  postComments: CommentExtended[];
  postLikes: LikeExtended[];
  postId: string;
};

export const PostFooter = ({
  isPage = false,
  isPostContent = false,
  postComments,
  postLikes,
  postId,
}: PostFooterProps) => {
  const [areDesktopCommentsOpen, setAreDesktopCommentsOpen] = useState(false);
  const [areMobileCommentsOpen, setAreMobileCommentsOpen] = useState(false);
  const [areDesktopLikesOpen, setAreDesktopLikesOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();
  const currentUser = useCurrentUser();

  const isMyLike = (like: LikeExtended) =>
    like.userId === currentUser?.id && like.postId === postId;

  const [optimisticLikes, addOptimisticLike] = useOptimistic<LikeExtended[]>(
    postLikes,
    // @ts-ignore
    (likes: LikeExtended[], newLike: LikeExtended) =>
      likes.some(isMyLike)
        ? likes.filter((like) => like.userId !== currentUser?.id)
        : [
            { ...newLike, postId, user: currentUser, userId: currentUser?.id },
            ...likes,
          ]
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
        user: currentUser,
        userId: currentUser?.id,
      },
      ...comments,
    ]
  );

  const handleDesktopCommentsOpen = () =>
    setAreDesktopCommentsOpen(!areDesktopCommentsOpen);

  const openMobileComments = () => setAreMobileCommentsOpen(true);

  const closeMobileComments = () => setAreMobileCommentsOpen(false);

  const openDesktopLikes = () => setAreDesktopLikesOpen(true);

  const closeDesktopLikes = () => setAreDesktopLikesOpen(false);

  const handleOptimisticLike = async () => {
    startTransition(() =>
      addOptimisticLike({ postId, userId: currentUser?.id })
    );

    try {
      await likePost(postId, currentUser?.id as string);
    } catch (error) {
      error instanceof Error &&
        showToast.error(t(`toast-messages.error.${error.message}`));
    }
  };

  const renderMobileFooterInfo = () =>
    (optimisticLikes.length > 0 || optimisticComments.length > 0) && (
      <div
        className={classNames(
          'only-mobile flex-center-justify-between primary-transition w-full px-3 py-2',
          {
            'hover:bg-neutral-700 hover:bg-opacity-50': isPostContent,
            'hover:primary-bg': !isPostContent,
          }
        )}
        onClick={() => (isPage ? openDesktopLikes() : openMobileComments())}
        onKeyPress={(e) =>
          (e.key === 'Enter' || e.key === ' ') && isPage
            ? openDesktopLikes()
            : openMobileComments()
        }
        role="button"
        tabIndex={0}
      >
        <PostFooterInfo
          hideComments={isPage}
          isMyLike={isMyLike}
          isPostContent={isPostContent}
          optimisticComments={optimisticComments}
          optimisticLikes={optimisticLikes}
        />
      </div>
    );

  return (
    <>
      {(optimisticLikes.length > 0 || optimisticComments.length > 0) && (
        <div className="md:px-4">
          {!isPage && renderMobileFooterInfo()}
          <div className="only-desktop center-justify-between w-full px-0 py-3">
            <PostFooterInfo
              handleDesktopCommentsOpen={handleDesktopCommentsOpen}
              isMyLike={isMyLike}
              openDesktopLikes={openDesktopLikes}
              optimisticComments={optimisticComments}
              optimisticLikes={optimisticLikes}
            />
          </div>
        </div>
      )}
      <PostFooterActions
        areDesktopCommentsOpen={areDesktopCommentsOpen}
        areMobileCommentsOpen={areMobileCommentsOpen}
        handleDesktopCommentsOpen={handleDesktopCommentsOpen}
        handleOptimisticLike={handleOptimisticLike}
        isMyLike={isMyLike}
        isPostContent={isPostContent}
        openMobileComments={openMobileComments}
        optimisticLikes={optimisticLikes}
        postId={postId}
      />
      {isPage && renderMobileFooterInfo()}
      {areDesktopCommentsOpen && (
        <div
          className={classNames(
            'only-desktop w-full border-l-4 border-primary-100',
            {
              'h-72': optimisticComments.length === 0,
              'h-full overflow-y-auto': optimisticComments.length > 0,
            }
          )}
        >
          <PostComments optimisticComments={optimisticComments} />
        </div>
      )}
      {isPage && (
        <div className="py-3">
          <PostComments optimisticComments={optimisticComments} />
        </div>
      )}
      <div
        className={classNames('md:px-4', {
          'w-full': isPostContent,
          'primary-border border-t': areDesktopCommentsOpen,
        })}
      >
        <div className="only-desktop space-x-2 pb-2 pt-4">
          <ProfilePic />
          <PostCommentsBottomSheetFooter
            addOptimisticComment={addOptimisticComment}
            postId={postId}
            setAreDesktopCommentsOpen={setAreDesktopCommentsOpen}
            variant="post-footer"
          />
        </div>
        <p className="only-desktop secondary-text ml-16 pb-4 text-xs">
          {t('posts.post.footer.comments.press-enter-to-post')}
        </p>
      </div>
      <Drawer.Root open={areMobileCommentsOpen} onClose={closeMobileComments}>
        <PostCommentsBottomSheet
          addOptimisticComment={addOptimisticComment}
          handleOptimisticLike={handleOptimisticLike}
          isMyLike={isMyLike}
          onDismiss={closeMobileComments}
          optimisticComments={optimisticComments}
          optimisticLikes={optimisticLikes}
          postId={postId}
        />
      </Drawer.Root>
      <Drawer.Root open={areDesktopLikesOpen} onClose={closeDesktopLikes}>
        <PostLikesBottomSheet optimisticLikes={optimisticLikes} />
      </Drawer.Root>
    </>
  );
};
