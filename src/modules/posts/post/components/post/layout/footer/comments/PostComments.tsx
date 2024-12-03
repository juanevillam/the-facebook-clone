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
    <div className="h-full w-full overflow-y-auto px-4 md:px-3 md:pb-10">
      {optimisticComments.length > 0 ? (
        <div className="space-y-4 pb-2 md:pt-4">
          {optimisticComments.map((optimisticComment, index) => (
            <PostComment key={index} {...optimisticComment} />
          ))}
        </div>
      ) : (
        <div className="flex-center-justify-center h-full flex-col space-y-4">
          <ChatBubbleLeftRightIcon className="secondary-fill size-40" />
          <h1 className="secondary-text text-xl">{t('no-comments-yet')}</h1>
        </div>
      )}
    </div>
  );
};
