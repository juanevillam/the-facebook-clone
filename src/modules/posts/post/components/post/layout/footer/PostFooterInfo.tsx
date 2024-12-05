import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { ThumbUpImage } from '@/components/images';
import { CommentExtended, LikeExtended } from '@/modules/posts/post/types';

type PostFooterInfoProps = {
  handleDesktopCommentsOpen?: VoidFunction;
  isModal?: boolean;
  isMyLike: (like: LikeExtended) => boolean;
  openDesktopLikes?: VoidFunction;
  optimisticComments: CommentExtended[];
  optimisticLikes: LikeExtended[];
};

export const PostFooterInfo = ({
  handleDesktopCommentsOpen,
  isModal,
  isMyLike,
  openDesktopLikes,
  optimisticComments,
  optimisticLikes,
}: PostFooterInfoProps) => {
  const t = useTranslations('posts.post.footer');
  const liked = optimisticLikes.some(isMyLike);

  return (
    <>
      <button
        aria-label={t('likes.open-likes')}
        className="flex-center space-x-1.5"
        onClick={openDesktopLikes && openDesktopLikes}
        type="button"
      >
        {optimisticLikes.length > 0 && (
          <>
            <ThumbUpImage className="size-4 md:size-5" />
            <p
              className={classNames('text-sm md:hover:underline', {
                'secondary-text-dark md:secondary-text': isModal,
                'secondary-text': !isModal,
              })}
            >
              {liked && t('likes.you')}
              {!liked && optimisticLikes.length}
              {liked &&
                optimisticLikes.length > 1 &&
                ` ${t('likes.and')} ${optimisticLikes.length - 1} ${
                  optimisticLikes.length > 2
                    ? t('likes.people')
                    : t('likes.person')
                } ${t('likes.more')}`}
            </p>
          </>
        )}
      </button>
      {optimisticComments.length > 0 && (
        <button
          aria-label={t('comments.open-comments')}
          onClick={handleDesktopCommentsOpen}
          type="button"
        >
          <p
            className={classNames('text-sm md:hover:underline', {
              'secondary-text-dark md:secondary-text': isModal,
              'secondary-text': !isModal,
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
