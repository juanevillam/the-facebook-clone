'use client';

import { Like } from '@prisma/client';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import {
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
} from '@/assets/ui/icons';
import { likePost } from '@/modules/posts/list/api';

import { PostFooterActionsItem } from './item/PostFooterActionsItem';

interface PostFooterActionsProps {
  addOptimisticLike: (action: unknown) => void;
  isMyLike: (like: Like) => boolean;
  optimisticLikes: Like[];
  postId: string;
  showBorderT: boolean;
  userId: string;
}

export const PostFooterActions = ({
  addOptimisticLike,
  isMyLike,
  optimisticLikes,
  postId,
  showBorderT,
  userId,
}: PostFooterActionsProps) => {
  const t = useTranslations('toast-messages.success');

  const handleOptimisticLike = async () => {
    addOptimisticLike({ postId, userId });
    await likePost(postId, userId);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`);
    showToast.success(t('link-copied-to-clipboard'));
  };

  return (
    <div
      className={classNames('md:main-border flex md:py-1.5 md:space-x-1.5', {
        'md:border-t': showBorderT,
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
