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
  PostExtended,
  PostVariant,
} from '@/modules/posts/post/types';

import { PostFooterActions } from './actions/PostFooterActions';
import {
  PostComments,
  PostCommentsBottomSheet,
  PostCommentsBottomSheetFooter,
} from './comments';
import { PostLikesBottomSheet } from './likes';
import { PostFooterInfo } from './PostFooterInfo';

type PostFooterProps = {
  post: PostExtended;
  variant: PostVariant;
};

export const PostFooter = ({
  post: { comments, id, likes },
  variant,
}: PostFooterProps) => {
  const isModal = variant === 'modal';

  const [mobileCommentsOpen, setMobileCommentsOpen] = useState(false);
  const [desktopCommentsOpen, setDesktopCommentsOpen] = useState(false);
  const [desktopLikesOpen, setDesktopLikesOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();
  const currentUser = useCurrentUser();

  const isMyLike = (like: LikeExtended) =>
    like.userId === currentUser?.id && like.postId === id;

  const [optimisticLikes, addOptimisticLike] = useOptimistic<LikeExtended[]>(
    likes,
    // @ts-ignore
    (likes: LikeExtended[], newLike: LikeExtended) =>
      likes.some(isMyLike)
        ? likes.filter((like) => like.userId !== currentUser?.id)
        : [
            {
              ...newLike,
              postId: id,
              user: currentUser,
              userId: currentUser?.id,
            },
            ...likes,
          ]
  );

  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentExtended[]
  >(
    comments,
    // @ts-ignore
    (comments: CommentExtended[], newComment: CommentExtended) => [
      {
        postId: id,
        thoughts: newComment,
        user: currentUser,
        userId: currentUser?.id,
      },
      ...comments,
    ]
  );

  const openMobileComments = () => setMobileCommentsOpen(true);

  const closeMobileComments = () => setMobileCommentsOpen(false);

  const handleDesktopCommentsOpen = () =>
    setDesktopCommentsOpen(!desktopCommentsOpen);

  const openDesktopLikes = () => setDesktopLikesOpen(true);

  const closeDesktopLikes = () => setDesktopLikesOpen(false);

  const handleOptimisticLike = async () => {
    startTransition(() =>
      addOptimisticLike({ postId: id, userId: currentUser?.id })
    );

    try {
      await likePost(id, currentUser?.id as string);
    } catch (error) {
      error instanceof Error &&
        showToast.error(t(`toast-messages.error.${error.message}`));
    }
  };

  return (
    <>
      {(optimisticLikes.length > 0 || optimisticComments.length > 0) && (
        <div className="md:px-4">
          <div
            className={classNames(
              'responsive-mobile-only flex-between transition-primary w-full px-3 py-2',
              {
                'hover:bg-neutral-700 hover:bg-opacity-50': isModal,
                'hover:bg-primary': !isModal,
              }
            )}
            onClick={openMobileComments}
            onKeyPress={(e) =>
              (e.key === 'Enter' || e.key === ' ') && openMobileComments()
            }
            role="button"
            tabIndex={0}
          >
            <PostFooterInfo
              isModal={isModal}
              isMyLike={isMyLike}
              optimisticComments={optimisticComments}
              optimisticLikes={optimisticLikes}
            />
          </div>
          <div className="responsive-desktop-only align-between w-full px-0 py-3">
            <PostFooterInfo
              handleDesktopCommentsOpen={handleDesktopCommentsOpen}
              isModal={isModal}
              isMyLike={isMyLike}
              openDesktopLikes={openDesktopLikes}
              optimisticComments={optimisticComments}
              optimisticLikes={optimisticLikes}
            />
          </div>
        </div>
      )}
      <PostFooterActions
        desktopCommentsOpen={desktopCommentsOpen}
        handleDesktopCommentsOpen={handleDesktopCommentsOpen}
        handleOptimisticLike={handleOptimisticLike}
        isModal={isModal}
        isMyLike={isMyLike}
        mobileCommentsOpen={mobileCommentsOpen}
        openMobileComments={openMobileComments}
        optimisticLikes={optimisticLikes}
        postId={id}
      />
      {desktopCommentsOpen && (
        <div
          aria-label={t('posts.post.footer.comments.open-comments')}
          className={classNames(
            'responsive-desktop-only w-full border-l-4 border-primary-100',
            {
              'h-72': optimisticComments.length === 0,
              'h-full overflow-y-auto': optimisticComments.length > 0,
            }
          )}
        >
          <PostComments optimisticComments={optimisticComments} />
        </div>
      )}
      <div
        className={classNames('md:px-4', {
          'w-full': isModal,
          'border-primary border-t': desktopCommentsOpen,
        })}
      >
        <div className="responsive-desktop-only space-x-2 pb-2 pt-4">
          <ProfilePic />
          <PostCommentsBottomSheetFooter
            addOptimisticComment={addOptimisticComment}
            postId={id}
            setDesktopCommentsOpen={setDesktopCommentsOpen}
            variant="post-footer"
          />
        </div>
        <p className="responsive-desktop-only text-secondary ml-16 pb-4 text-xs">
          {t('posts.post.footer.comments.press-enter-to-post')}
        </p>
      </div>
      <Drawer.Root open={mobileCommentsOpen} onClose={closeMobileComments}>
        <PostCommentsBottomSheet
          addOptimisticComment={addOptimisticComment}
          handleOptimisticLike={handleOptimisticLike}
          isMyLike={isMyLike}
          onDismiss={closeMobileComments}
          optimisticComments={optimisticComments}
          optimisticLikes={optimisticLikes}
          postId={id}
        />
      </Drawer.Root>
      <Drawer.Root open={desktopLikesOpen} onClose={closeDesktopLikes}>
        <PostLikesBottomSheet optimisticLikes={optimisticLikes} />
      </Drawer.Root>
    </>
  );
};
