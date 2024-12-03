'use client';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import {
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
} from '@/assets/ui/icons';
import { LikeExtended } from '@/modules/posts/post/assets/types';

import { PostFooterActionsItem } from './PostFooterActionsItem';

type PostFooterActionsProps = {
  desktopCommentsOpen: boolean;
  handleDesktopCommentsOpen: VoidFunction;
  handleOptimisticLike: VoidFunction;
  isModal: boolean;
  isMyLike: (like: LikeExtended) => boolean;
  mobileCommentsOpen: boolean;
  openMobileComments: VoidFunction;
  optimisticLikes: LikeExtended[];
  postId: string;
};

export const PostFooterActions = ({
  desktopCommentsOpen,
  handleDesktopCommentsOpen,
  handleOptimisticLike,
  isModal,
  isMyLike,
  mobileCommentsOpen,
  openMobileComments,
  optimisticLikes,
  postId,
}: PostFooterActionsProps) => {
  const t = useTranslations('toast-messages.success');

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`);
    showToast.success(t('link-copied-to-clipboard'));
  };

  return (
    <div
      className={classNames(
        'primary-border flex md:space-x-1 md:border-y md:px-4 md:py-2.5',
        {
          'primary-border-dark md:primary-border border-t': isModal,
        }
      )}
    >
      <PostFooterActionsItem
        Icon={HandThumbUpIcon}
        isActive={optimisticLikes.some(isMyLike)}
        isModal={isModal}
        label="like"
        onClick={handleOptimisticLike}
      />
      <PostFooterActionsItem
        className="only-mobile"
        Icon={ChatBubbleOvalLeftIcon}
        isActive={mobileCommentsOpen}
        isModal={isModal}
        label="comment"
        onClick={openMobileComments}
      />
      <PostFooterActionsItem
        className="only-desktop"
        Icon={ChatBubbleOvalLeftIcon}
        isActive={desktopCommentsOpen}
        isModal={isModal}
        label="comment"
        onClick={handleDesktopCommentsOpen}
      />
      <PostFooterActionsItem
        Icon={ShareIcon}
        isActive={false}
        isModal={isModal}
        label="share"
        onClick={handleShare}
      />
    </div>
  );
};
