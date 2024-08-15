import { useState, useTransition } from 'react';

import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { PaperPlaneIcon } from '@/assets/ui/icons';
import { useCurrentUser } from '@/hooks';
import { commentPost } from '@/modules/posts/post/actions';

type PostCommentsBottomSheetFooterProps = {
  addOptimisticComment: (action: unknown) => void;
  postId: string;
};

export const PostCommentsBottomSheetFooter = ({
  addOptimisticComment,
  postId,
}: PostCommentsBottomSheetFooterProps) => {
  const [thoughts, setThoughts] = useState('');
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();
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
      showToast.error(t(`toast-messages.error.${message}`))
    );
  };

  return (
    <form
      className="bg-white dark:bg-neutral-800 border-t primary-border flex-center space-x-2 p-2 md:p-3 w-full"
      onSubmit={handleOptimisticComment}
    >
      <div className="flex-center primary-bg p-2.5 rounded-full w-full">
        <label className="sr-only" htmlFor="post-comments-bottom-sheet-input">
          {t('posts.post.comments.bottom-sheet.title')}
        </label>
        <input
          aria-label={t('posts.post.comments.bottom-sheet.title')}
          className="primary-placeholder primary-text primary-transition bg-transparent inline-flex ml-2 w-full focus:outline-none"
          id="post-comments-bottom-sheet-input"
          onChange={handleComment}
          placeholder={`${t('posts.post.comments.bottom-sheet.title')}...`}
          type="text"
          value={thoughts}
        />
      </div>
      {thoughts && (
        <button
          className="flex-center-justify-center primary-transition p-2 rounded-full hover:primary-bg"
          onClick={handleOptimisticComment}
          type="submit"
        >
          <PaperPlaneIcon className="fill-primary-100 size-7" />
        </button>
      )}
    </form>
  );
};
