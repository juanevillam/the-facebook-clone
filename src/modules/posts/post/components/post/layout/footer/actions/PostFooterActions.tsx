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

import { PostFooterActionsItem } from './item/PostFooterActionsItem';

type PostFooterActionsProps = {
  areDesktopCommentsOpen: boolean;
  areMobileCommentsOpen: boolean;
  handleDesktopCommentsOpen: VoidFunction;
  handleOptimisticLike: VoidFunction;
  isMyLike: (like: LikeExtended) => boolean;
  isPostContent: boolean;
  openMobileComments: VoidFunction;
  optimisticLikes: LikeExtended[];
  postId: string;
};

export const PostFooterActions = ({
  areDesktopCommentsOpen,
  areMobileCommentsOpen,
  handleDesktopCommentsOpen,
  handleOptimisticLike,
  isMyLike,
  isPostContent,
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
          'primary-border-dark md:primary-border border-t': isPostContent,
        }
      )}
    >
      <PostFooterActionsItem
        Icon={HandThumbUpIcon}
        isActive={optimisticLikes.some(isMyLike)}
        isPostContent={isPostContent}
        label="like"
        onClick={handleOptimisticLike}
      />
      <PostFooterActionsItem
        className="only-mobile"
        Icon={ChatBubbleOvalLeftIcon}
        isActive={areMobileCommentsOpen}
        isPostContent={isPostContent}
        label="comment"
        onClick={openMobileComments}
      />
      <PostFooterActionsItem
        className="only-desktop"
        Icon={ChatBubbleOvalLeftIcon}
        isActive={areDesktopCommentsOpen}
        isPostContent={isPostContent}
        label="comment"
        onClick={handleDesktopCommentsOpen}
      />
      <PostFooterActionsItem
        Icon={ShareIcon}
        isActive={false}
        isPostContent={isPostContent}
        label="share"
        onClick={handleShare}
      />
    </div>
  );
};