'use client';

import { Like } from '@prisma/client';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { VoidFunction } from '@/assets/types';
import {
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
} from '@/assets/ui/icons';

import { PostFooterActionsItem } from './item/PostFooterActionsItem';

interface PostFooterActionsProps {
  handleOptimisticLike: VoidFunction;
  isMyLike: (like: Like) => boolean;
  openCommentsBottomSheet: VoidFunction;
  optimisticLikes: Like[];
  postId: string;
  showBorderT: boolean;
}

export const PostFooterActions = ({
  handleOptimisticLike,
  isMyLike,
  openCommentsBottomSheet,
  optimisticLikes,
  postId,
  showBorderT,
}: PostFooterActionsProps) => {
  const t = useTranslations('toast-messages.success');

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`);
    showToast.success(t('link-copied-to-clipboard'));
  };

  return (
    <div
      className={classNames('flex md:py-2.5 md:space-x-1', {
        'md:border-t md:primary-border': showBorderT,
      })}
    >
      <form action={handleOptimisticLike} className="w-full">
        <PostFooterActionsItem
          Icon={HandThumbUpIcon}
          isActive={optimisticLikes.some(isMyLike)}
          label="like"
          type="submit"
        />
      </form>
      <PostFooterActionsItem
        Icon={ChatBubbleOvalLeftIcon}
        isActive={false}
        label="comment"
        onClick={openCommentsBottomSheet}
        type="button"
      />
      <PostFooterActionsItem
        Icon={ShareIcon}
        isActive={false}
        label="share"
        onClick={handleShare}
        type="button"
      />
    </div>
  );
};
