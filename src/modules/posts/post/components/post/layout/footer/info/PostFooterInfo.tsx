import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { ThumbUpImage } from '@/components/images';
import {
  CommentExtended,
  LikeExtended,
} from '@/modules/posts/post/assets/types';

type PostFooterInfoProps = {
  handleDesktopCommentsOpen?: VoidFunction;
  isMyLike: (like: LikeExtended) => boolean;
  isPostContent?: boolean;
  optimisticComments: CommentExtended[];
  optimisticLikes: LikeExtended[];
};

export const PostFooterInfo = ({
  handleDesktopCommentsOpen,
  isMyLike,
  isPostContent = false,
  optimisticComments,
  optimisticLikes,
}: PostFooterInfoProps) => {
  const t = useTranslations('posts.post.footer');

  return (
    <>
      <div className="flex-center space-x-1.5">
        {optimisticLikes.length > 0 && (
          <>
            <ThumbUpImage className="size-4 md:size-5" />
            <p
              className={classNames('text-sm', {
                'secondary-text-dark': isPostContent,
                'secondary-text': !isPostContent,
              })}
            >
              {optimisticLikes.some(isMyLike) && t('likes.you')}
              {!optimisticLikes.some(isMyLike) && optimisticLikes.length}
              {optimisticLikes.some(isMyLike) &&
                optimisticLikes.length > 1 &&
                ` ${t('likes.and')} ${optimisticLikes.length - 1} ${
                  optimisticLikes.length > 2
                    ? t('likes.people')
                    : t('likes.person')
                } ${t('likes.more')}`}
            </p>
          </>
        )}
      </div>
      {optimisticComments.length > 0 && (
        <button onClick={handleDesktopCommentsOpen} type="button">
          <p
            className={classNames('text-sm md:hover:underline', {
              'secondary-text-dark': isPostContent,
              'secondary-text': !isPostContent,
            })}
          >
            {`${optimisticComments.length} `}
            {optimisticComments.length === 1
              ? t('comments.comment')
              : t('comments.comments')}
          </p>
        </button>
      )}
    </>
  );
};