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
  handleOptimisticLike: VoidFunction;
  isCommentsBottomSheetOpen: boolean;
  isMyLike: (like: LikeExtended) => boolean;
  isPostModal?: boolean;
  openCommentsBottomSheet: VoidFunction;
  optimisticLikes: LikeExtended[];
  postId: string;
  showBorderT?: boolean;
};

export const PostFooterActions = ({
  handleOptimisticLike,
  isCommentsBottomSheetOpen,
  isMyLike,
  isPostModal,
  openCommentsBottomSheet,
  optimisticLikes,
  postId,
  showBorderT = false,
}: PostFooterActionsProps) => {
  const t = useTranslations('toast-messages.success');

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`);
    showToast.success(t('link-copied-to-clipboard'));
  };

  return (
    <div
      className={classNames('flex md:space-x-1 md:py-2.5', {
        'md:primary-border md:border-t': showBorderT,
        'md:primary-border md:border-y md:py-1.5': isPostModal,
      })}
    >
      <PostFooterActionsItem
        Icon={HandThumbUpIcon}
        isActive={optimisticLikes.some(isMyLike)}
        label="like"
        onClick={handleOptimisticLike}
        showLabel={!isPostModal}
      />
      <PostFooterActionsItem
        Icon={ChatBubbleOvalLeftIcon}
        isActive={isCommentsBottomSheetOpen}
        label="comment"
        onClick={openCommentsBottomSheet}
        showLabel={!isPostModal}
      />
      <PostFooterActionsItem
        Icon={ShareIcon}
        isActive={false}
        label="share"
        onClick={handleShare}
        showLabel={!isPostModal}
      />
    </div>
  );
};
