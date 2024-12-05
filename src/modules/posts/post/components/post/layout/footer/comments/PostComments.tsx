import { useTranslations } from 'next-intl';

import { ChatBubbleLeftRightIcon } from '@/assets/icons';
import { CommentExtended } from '@/modules/posts/post/types';

import { PostComment } from './PostComment';

type PostCommentsProps = {
  optimisticComments: CommentExtended[];
};

export const PostComments = ({ optimisticComments }: PostCommentsProps) => {
  const t = useTranslations('posts.post.comments.bottom-sheet');

  return (
    <section
      aria-labelledby="post-comments-title"
      className="h-full w-full overflow-y-auto px-4 md:px-3 md:pb-10"
    >
      <h1 className="sr-only" id="post-comments-title">
        {t('title')}
      </h1>
      {optimisticComments.length > 0 ? (
        <div className="space-y-4 pb-2 md:pt-4">
          {optimisticComments.map((optimisticComment, index) => (
            <PostComment key={index} {...optimisticComment} />
          ))}
        </div>
      ) : (
        <div
          aria-label={t('no-comments-yet')}
          className="flex-center-justify-center h-full flex-col space-y-4"
          role="region"
        >
          <ChatBubbleLeftRightIcon
            aria-hidden="true"
            className="secondary-fill size-40"
          />
          <p className="secondary-text text-xl">{t('no-comments-yet')}</p>
        </div>
      )}
    </section>
  );
};
