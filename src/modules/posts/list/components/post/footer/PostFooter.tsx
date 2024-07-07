'use client';

import { useOptimistic } from 'react';

import { Like } from '@prisma/client';
import { useTranslations } from 'next-intl';

import { LikeIcon } from '@/assets/ui/icons';
import { useCurrentUser } from '@/hooks';

import { PostFooterActions } from './actions/PostFooterActions';

interface PostFooterProps {
  media: string;
  postLikes: Like[];
  postId: string;
}

export const PostFooter = ({ media, postLikes, postId }: PostFooterProps) => {
  const user = useCurrentUser();
  const t = useTranslations('posts.post.footer.likes');
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

  return (
    <div className="md:px-4">
      {optimisticLikes.length > 0 && (
        <div className="flex-center px-3 md:px-0 py-2 md:py-3 space-x-1 md:space-x-2 text-sm">
          <LikeIcon className="size-4 md:size-5" />
          <p className="secondary-text">
            {optimisticLikes.some(isMyLike) && t('you')}
            {!optimisticLikes.some(isMyLike) && optimisticLikes.length}
            {optimisticLikes.some(isMyLike) &&
              optimisticLikes.length > 1 &&
              ` ${t('and')} ${optimisticLikes.length - 1} ${optimisticLikes.length > 2 ? t('people') : t('person')} ${t('more')}`}
          </p>
        </div>
      )}
      <PostFooterActions
        addOptimisticLike={addOptimisticLike}
        isMyLike={isMyLike}
        optimisticLikes={optimisticLikes}
        postId={postId}
        showBorderT={media ? optimisticLikes.length > 0 : true}
        userId={user?.id as string}
      />
    </div>
  );
};
