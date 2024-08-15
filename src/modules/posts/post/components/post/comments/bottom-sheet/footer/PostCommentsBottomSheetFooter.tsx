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
      className="primary-border flex-center w-full space-x-2 border-t bg-white p-2 md:p-3 dark:bg-neutral-800"
      onSubmit={handleOptimisticComment}
    >
      <div className="flex-center primary-bg w-full rounded-full p-2.5">
        <label className="sr-only" htmlFor="post-comments-bottom-sheet-input">
          {t('posts.post.comments.bottom-sheet.title')}
        </label>
        <input
          aria-label={t('posts.post.comments.bottom-sheet.title')}
          className="primary-placeholder primary-text primary-transition ml-2 inline-flex w-full bg-transparent focus:outline-none"
          id="post-comments-bottom-sheet-input"
          onChange={handleComment}
          placeholder={`${t('posts.post.comments.bottom-sheet.title')}...`}
          type="text"
          value={thoughts}
        />
      </div>
      {thoughts && (
        <button
          className="flex-center-justify-center primary-transition hover:primary-bg rounded-full p-2"
          onClick={handleOptimisticComment}
          type="submit"
        >
          <PaperPlaneIcon className="size-7 fill-primary-100" />
        </button>
      )}
    </form>
  );
};
