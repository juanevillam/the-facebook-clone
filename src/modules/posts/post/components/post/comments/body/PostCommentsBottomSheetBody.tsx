import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { ChatBubbleLeftRightIcon } from '@/assets/ui/icons';
import { CommentExtended } from '@/modules/posts/post/assets/types';

import { PostCommentsBottomSheetBodyItem } from './item/PostCommentsBottomSheetBodyItem';

type PostCommentsBottomSheetBodyProps = {
  isMobile?: boolean;
  optimisticComments: CommentExtended[];
};

export const PostCommentsBottomSheetBody = ({
  isMobile,
  optimisticComments,
}: PostCommentsBottomSheetBodyProps) => {
  const t = useTranslations('posts.post.comments.bottom-sheet');

  return (
    <div className="h-full w-full overflow-y-auto md:overflow-y-visible">
      {optimisticComments.length > 0 ? (
        <div className={classNames('space-y-4 pb-2', { 'px-4': isMobile })}>
          {optimisticComments.map((optimisticComment, index) => (
            <PostCommentsBottomSheetBodyItem
              key={index}
              {...optimisticComment}
            />
          ))}
        </div>
      ) : (
        <div className="flex-center-justify-center h-full flex-col">
          <ChatBubbleLeftRightIcon className="secondary-fill mb-4 size-40" />
          <h1 className="secondary-text text-xl">{t('no-comments-yet')}</h1>
        </div>
      )}
    </div>
  );
};
