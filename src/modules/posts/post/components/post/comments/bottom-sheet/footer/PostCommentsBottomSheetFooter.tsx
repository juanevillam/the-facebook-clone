import { useState, useTransition } from 'react';

import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { PaperPlaneIcon } from '@/assets/ui/icons';
import { useCurrentUser } from '@/hooks';
import { commentPost } from '@/modules/posts/post/actions';

interface PostCommentsBottomSheetFooterProps {
  addOptimisticComment: (action: unknown) => void;
  postId: string;
}

export const PostCommentsBottomSheetFooter = ({
  addOptimisticComment,
  postId,
}: PostCommentsBottomSheetFooterProps) => {
  const [thoughts, setThoughts] = useState('');
  const [isPending, startTransition] = useTransition();
  const tBottomSheet = useTranslations('posts.post.comments.bottom-sheet');
  const tErrorToastMessages = useTranslations('toast-messages.error');
  const user = useCurrentUser();

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) =>
    setThoughts(event.target.value);

  const handleOptimisticComment = () => {
    const thoughtsCopy = thoughts;

    setThoughts('');
    startTransition(() => {
      addOptimisticComment(thoughtsCopy);
    });

    commentPost(postId, thoughtsCopy, user?.id as string).catch(({ message }) =>
      showToast.error(tErrorToastMessages(message))
    );
  };

  return (
    <form
      className="bg-white dark:bg-neutral-800 border-t flex-center space-x-2 p-2 md:p-3 primary-border w-full"
      onSubmit={handleOptimisticComment}
    >
      <div className="flex-center primary-bg p-2.5 rounded-full w-full">
        <label className="sr-only" htmlFor="post-comments-bottom-sheet-input">
          {tBottomSheet('title')}
        </label>
        <input
          aria-label={tBottomSheet('title')}
          className="primary-placeholder primary-text primary-transition bg-transparent inline-flex ml-2 w-full focus:outline-none"
          id="post-comments-bottom-sheet-input"
          onChange={handleComment}
          placeholder={`${tBottomSheet('title')}...`}
          type="text"
          value={thoughts}
        />
      </div>
      {thoughts && (
        <button
          className="flex-center-justify-center p-2 primary-transition rounded-full hover:primary-bg"
          onClick={handleOptimisticComment}
          type="submit"
        >
          <PaperPlaneIcon className="size-7 fill-primary-100" />
        </button>
      )}
    </form>
  );
};
