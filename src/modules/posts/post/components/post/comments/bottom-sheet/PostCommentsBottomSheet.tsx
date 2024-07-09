import { useState, useTransition } from 'react';

import { Like } from '@prisma/client';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import { Drawer } from 'vaul';

import { VoidFunction } from '@/assets/types';
import {
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  HandThumbUpIcon,
  LikeIcon,
  PaperPlaneIcon,
} from '@/assets/ui/icons';
import { commentPost } from '@/modules/posts/post/api';
import { comments } from '@/modules/posts/post/assets/types';

interface PostCommentsBottomSheetProps {
  addOptimisticComment: (action: unknown) => void;
  handleOptimisticLike: VoidFunction;
  isMyLike: (like: Like) => boolean;
  onDismiss: VoidFunction;
  optimisticComments: comments[];
  optimisticLikes: Like[];
  postId: string;
  userId: string;
}

export const PostCommentsBottomSheet = ({
  addOptimisticComment,
  handleOptimisticLike,
  isMyLike,
  onDismiss,
  optimisticComments,
  optimisticLikes,
  postId,
  userId,
}: PostCommentsBottomSheetProps) => {
  const [thoughts, setThoughts] = useState('');
  const [isPending, startTransition] = useTransition();
  const tBottomSheet = useTranslations('posts.post.comments.bottom-sheet');
  const tLikes = useTranslations('posts.post.footer.likes');
  const tErrorToastMessages = useTranslations('toast-messages.error');

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) =>
    setThoughts(event.target.value);

  const handleOptimisticComment = () => {
    const thoughtsCopy = thoughts;

    setThoughts('');
    startTransition(() => {
      addOptimisticComment(thoughtsCopy);
    });

    commentPost(postId, thoughtsCopy, userId).catch(({ message }) =>
      showToast.error(tErrorToastMessages(message))
    );
  };

  return (
    <Drawer.Portal>
      <Drawer.Overlay className="bottom-sheet-overlay" onClick={onDismiss} />
      <Drawer.Content className="bottom-sheet-content h-full">
        <Drawer.Handle className="bottom-sheet-handle" />
        <Drawer.Title className="sr-only">{tBottomSheet('title')}</Drawer.Title>
        <Drawer.Description className="sr-only">
          {tBottomSheet('description')}
        </Drawer.Description>
        <div className="flex flex-col h-full">
          {optimisticLikes.length > 0 && (
            <div className="flex-center justify-between p-2">
              <button
                className="flex-center-justify-center pl-2 py-1 primary-transition rounded-full space-x-1.5 hover:primary-bg"
                type="button"
              >
                <LikeIcon className="size-5" />
                <p className="font-medium primary-text text-lg">
                  {optimisticLikes.some(isMyLike) && tLikes('you')}
                  {!optimisticLikes.some(isMyLike) && optimisticLikes.length}
                  {optimisticLikes.some(isMyLike) &&
                    optimisticLikes.length > 1 &&
                    ` ${tLikes('and')} ${optimisticLikes.length - 1} ${tLikes('more')}`}
                </p>
                <ChevronRightIcon className="fill-none primary-stroke size-6 stroke-[1.5]" />
              </button>
              <form action={handleOptimisticLike}>
                <button
                  className="flex-center-justify-center p-1 primary-transition rounded-full hover:primary-bg"
                  type="submit"
                >
                  <HandThumbUpIcon
                    className={classNames('size-7 stroke-[1.5]', {
                      'fill-primary-100': optimisticLikes.some(isMyLike),
                      'fill-none primary-stroke':
                        !optimisticLikes.some(isMyLike),
                    })}
                    isActive={optimisticLikes.some(isMyLike)}
                  />
                </button>
              </form>
            </div>
          )}
          <div className="h-full overflow-y-auto">
            {optimisticComments.length > 0 ? (
              <div className="pb-20">
                {optimisticComments.map((optimisticComment, index) => (
                  <h1 className="primary-text text-5xl" key={index}>
                    {optimisticComment.thoughts}
                  </h1>
                ))}
              </div>
            ) : (
              <div className="flex-center-justify-center flex-col h-3/4">
                <ChatBubbleLeftRightIcon className="mb-4 secondary-fill size-40" />
                <h1 className="secondary-text text-xl">
                  {tBottomSheet('no-comments-yet')}
                </h1>
              </div>
            )}
          </div>
          <div className="bg-white dark:bg-neutral-800 border-t bottom-0 fixed flex-center space-x-2 px-3 py-1.5 primary-border w-full">
            <div className="flex-center primary-bg primary-transition p-2.5 rounded-full w-full">
              <label
                className="sr-only"
                htmlFor="post-comments-bottom-sheet-input"
              >
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
              <form onSubmit={handleOptimisticComment}>
                <button
                  className="flex-center-justify-center p-2 primary-transition rounded-full hover:primary-bg"
                  type="submit"
                >
                  <PaperPlaneIcon className="size-7 fill-primary-100" />
                </button>
              </form>
            )}
          </div>
        </div>
      </Drawer.Content>
      <Drawer.Overlay />
    </Drawer.Portal>
  );
};
