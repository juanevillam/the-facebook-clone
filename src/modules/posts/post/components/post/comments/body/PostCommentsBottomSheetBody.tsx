import { useTranslations } from 'next-intl';

import { ChatBubbleLeftRightIcon } from '@/assets/ui/icons';
import { CommentExtended } from '@/modules/posts/post/assets/types';

import { PostCommentsBottomSheetBodyItem } from './item/PostCommentsBottomSheetBodyItem';

interface PostCommentsBottomSheetBodyProps {
  optimisticComments: CommentExtended[];
}

export const PostCommentsBottomSheetBody = ({
  optimisticComments,
}: PostCommentsBottomSheetBodyProps) => {
  const t = useTranslations('posts.post.comments.bottom-sheet');

  return (
    <div className="h-full overflow-y-auto">
      {optimisticComments.length > 0 ? (
        <div className="pb-2 px-4 space-y-4">
          {optimisticComments.map((optimisticComment, index) => (
            <PostCommentsBottomSheetBodyItem
              key={index}
              {...optimisticComment}
            />
          ))}
        </div>
      ) : (
        <div className="flex-center-justify-center flex-col h-full">
          <ChatBubbleLeftRightIcon className="mb-4 secondary-fill size-40" />
          <h1 className="secondary-text text-xl">{t('no-comments-yet')}</h1>
        </div>
      )}
    </div>
  );
};
