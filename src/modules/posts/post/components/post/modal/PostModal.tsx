'use client';

import { useOptimistic, useTransition } from 'react';

import { Backdrop, Fade, Modal } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import ReactPlayer from 'react-player';

import { CloseIcon, LikeIcon } from '@/assets/ui/icons';
import { FacebookLogoMark } from '@/assets/ui/icons/brand';
import { IconButton } from '@/components/buttons';
import { useMount } from '@/hooks';
import { Feeling } from '@/modules/posts/create/assets/types';
import { usePathname } from '@/navigation';

import { likePost } from '../../../actions';
import {
  CommentExtended,
  LikeExtended,
  PostExtended,
} from '../../../assets/types';
import { PostFooterActions } from '../footer/actions/PostFooterActions';
import { PostHeader } from '../header/PostHeader';

interface PostModalProps {
  id: string;
  post: PostExtended;
}

export const PostModal = ({ id, post }: PostModalProps) => {
  const {
    comments,
    createdAt,
    feeling,
    id: postId,
    likes,
    location,
    media,
    mediaType,
    thoughts,
    savedBy,
    user,
  } = post;

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const tLikes = useTranslations('posts.post.footer.likes');
  const tComments = useTranslations('posts.post.footer.comments');
  const t = useTranslations('toast-messages.error');
  const mount = useMount();
  const pathname = usePathname();
  const isOpen = pathname === `/posts/${id}`;

  const closeModal = () => router.back();

  const isMyLike = (like: LikeExtended) =>
    like.userId === user?.id && like.postId === postId;

  const [optimisticLikes, addOptimisticLike] = useOptimistic<LikeExtended[]>(
    likes,
    // @ts-ignore
    (likes: LikeExtended[], newLike: LikeExtended) =>
      likes.some(isMyLike)
        ? likes.filter((like) => like.userId !== user?.id)
        : [...likes, newLike]
  );

  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentExtended[]
  >(
    comments,
    // @ts-ignore
    (comments: CommentExtended[], newComment: CommentExtended) => [
      {
        postId,
        thoughts: newComment,
        user,
        userId: user?.id,
      },
      ...comments,
    ]
  );

  const handleOptimisticLike = async () => {
    startTransition(() => addOptimisticLike({ postId, userId: user?.id }));

    try {
      await likePost(postId, user?.id as string);
    } catch (error) {
      if (error instanceof Error) showToast.error(t(error.message));
    }
  };

  if (!mount) return null;

  return (
    <Modal
      className="only-desktop z-40"
      closeAfterTransition
      onClose={closeModal}
      open={isOpen}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <div className="absolute card h-5/6 left-1/2 outline-none top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12">
          <div className="bg-black flex h-full overflow-hidden rounded-lg">
            <div className="absolute flex items-center left-4 space-x-4 top-4">
              <IconButton
                className="size-10 hover:bg-neutral-700"
                icon={{
                  className: 'stroke-white size-full stroke-2',
                  Component: CloseIcon,
                  name: 'close',
                }}
                onClick={closeModal}
              />
              <FacebookLogoMark className="size-10 hidden md:block" />
            </div>
            <div className="flex-grow">
              {media && (
                <>
                  {mediaType === 'image' && (
                    <Image
                      alt="Image"
                      className="object-contain size-full"
                      height={0}
                      priority
                      sizes="100vw"
                      src={media as string}
                      width={0}
                    />
                  )}
                  {mediaType === 'gif' && (
                    <Image
                      alt="GIF"
                      className="object-contain size-full"
                      height={0}
                      priority
                      sizes="100vw"
                      src={media as string}
                      unoptimized
                      width={0}
                    />
                  )}
                  {mediaType === 'video' && (
                    <ReactPlayer controls loop url={media} width="100%" />
                  )}
                </>
              )}
            </div>
            <div className="bg-white dark:bg-neutral-800 relative w-80">
              <PostHeader
                createdAt={createdAt}
                feeling={feeling as Feeling}
                image={user.image as string}
                location={location as string}
                name={user.name as string}
                postId={postId}
                postSaves={savedBy}
                postUserId={user.id}
              />
              <p className="mb-1.5 pl-3 primary-text">{thoughts}</p>
              <div className="md:px-4">
                {(optimisticLikes.length > 0 ||
                  optimisticComments.length > 0) && (
                  <div className="flex-center-justify-between py-2 md:py-3 px-3 md:px-0 w-full">
                    <div className="flex-center space-x-1.5">
                      <LikeIcon className="size-4 md:size-5" />
                      <p className="secondary-text text-sm md:hover:underline">
                        {optimisticLikes.some(isMyLike) && tLikes('you')}
                        {!optimisticLikes.some(isMyLike) &&
                          optimisticLikes.length}
                        {optimisticLikes.some(isMyLike) &&
                          optimisticLikes.length > 1 &&
                          ` ${tLikes('and')} ${optimisticLikes.length - 1} ${optimisticLikes.length > 2 ? tLikes('people') : tLikes('person')} ${tLikes('more')}`}
                      </p>
                    </div>
                    {optimisticComments.length > 1 && (
                      <p className="secondary-text text-sm md:hover:underline">
                        {`${optimisticComments.length} `}
                        {optimisticLikes.length === 1
                          ? tComments('comment')
                          : tComments('comments')}
                      </p>
                    )}
                  </div>
                )}
                <PostFooterActions
                  handleOptimisticLike={handleOptimisticLike}
                  isCommentsBottomSheetOpen={false}
                  isMyLike={isMyLike}
                  isPostModal
                  openCommentsBottomSheet={() => {}}
                  optimisticLikes={optimisticLikes}
                  postId={postId}
                />
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
