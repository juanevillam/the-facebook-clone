import { useState, useTransition } from 'react';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { PaperPlaneIcon } from '@/assets/icons';
import { useCurrentUser } from '@/hooks';
import { commentPost } from '@/modules/posts/post/actions';

type PostCommentsBottomSheetFooterProps = {
  addOptimisticComment: (action: unknown) => void;
  postId: string;
  setDesktopCommentsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: 'bottom-sheet' | 'post-footer';
};

export const PostCommentsBottomSheetFooter = ({
  addOptimisticComment,
  postId,
  setDesktopCommentsOpen,
  variant = 'bottom-sheet',
}: PostCommentsBottomSheetFooterProps) => {
  const [thoughts, setThoughts] = useState('');
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();
  const currentUser = useCurrentUser();

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) =>
    setThoughts(event.target.value);

  const handleOptimisticComment = () => {
    const thoughtsCopy = thoughts;

    setDesktopCommentsOpen && setDesktopCommentsOpen(true);
    setThoughts('');
    startTransition(() => addOptimisticComment(thoughtsCopy));
    commentPost(postId, thoughtsCopy, currentUser?.id as string).catch(
      ({ message }) => showToast.error(t(`toast-messages.error.${message}`))
    );
  };

  return (
    <form
      aria-label={t('posts.post.comments.bottom-sheet.form-aria-label')}
      className={classNames(
        'border-primary flex-align-center w-full space-x-2 border-t p-2',
        {
          'md:border-none md:p-0': variant === 'post-footer',
        }
      )}
      onSubmit={handleOptimisticComment}
    >
      <div className="flex-align-center bg-primary border-primary w-full rounded-full px-4 py-2.5">
        <label className="sr-only" htmlFor="post-comments-bottom-sheet-input">
          {t('posts.post.comments.bottom-sheet.title')}
        </label>
        <input
          aria-label={t('posts.post.comments.bottom-sheet.input-aria-label')}
          className="placeholder-primary md:placeholder-accent text-primary md:text-accent inline-flex w-full bg-transparent focus:outline-none"
          disabled={isPending}
          id="post-comments-bottom-sheet-input"
          onChange={handleComment}
          placeholder={`${t('posts.post.comments.bottom-sheet.title')}...`}
          type="text"
          value={thoughts}
        />
      </div>
      {thoughts && (
        <button
          aria-label={t('posts.post.comments.bottom-sheet.send-aria-label')}
          className="responsive-mobile-only flex-center hover:bg-primary rounded-full p-2"
          disabled={isPending || !thoughts.trim()}
          onClick={handleOptimisticComment}
          type="submit"
        >
          <PaperPlaneIcon className="size-7 fill-primary-100" />
        </button>
      )}
    </form>
  );
};
