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
  handleCommentsSection: VoidFunction;
  handleOptimisticLike: VoidFunction;
  isCommentsBottomSheetOpen: boolean;
  isCommentsSectionOpen: boolean;
  isMyLike: (like: LikeExtended) => boolean;
  isPostModal?: boolean;
  openCommentsBottomSheet: VoidFunction;
  optimisticLikes: LikeExtended[];
  postId: string;
};

export const PostFooterActions = ({
  handleCommentsSection,
  handleOptimisticLike,
  isCommentsBottomSheetOpen,
  isCommentsSectionOpen,
  isMyLike,
  isPostModal,
  openCommentsBottomSheet,
  optimisticLikes,
  postId,
}: PostFooterActionsProps) => {
  const t = useTranslations('toast-messages.success');

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`);
    showToast.success(t('link-copied-to-clipboard'));
  };

  return (
    <div className="md:primary-border flex md:space-x-1 md:border-y md:px-4 md:py-2.5">
      <PostFooterActionsItem
        Icon={HandThumbUpIcon}
        isActive={optimisticLikes.some(isMyLike)}
        label="like"
        onClick={handleOptimisticLike}
        showLabel={!isPostModal}
      />
      <PostFooterActionsItem
        className="only-mobile"
        Icon={ChatBubbleOvalLeftIcon}
        isActive={isCommentsBottomSheetOpen}
        label="comment"
        onClick={openCommentsBottomSheet}
        showLabel={!isPostModal}
      />
      <PostFooterActionsItem
        className="only-desktop"
        Icon={ChatBubbleOvalLeftIcon}
        isActive={isCommentsSectionOpen}
        label="comment"
        onClick={handleCommentsSection}
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
