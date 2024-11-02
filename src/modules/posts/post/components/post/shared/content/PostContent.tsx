'use client';

import Image from 'next/image';
import ReactPlayer from 'react-player';

import { CloseIcon } from '@/assets/ui/icons';
import { FacebookLogoMark } from '@/assets/ui/icons/brand';
import { IconButton } from '@/components/buttons';
import { Feeling } from '@/modules/posts/create/assets/types';
import { PostExtended } from '@/modules/posts/post/assets/types';

import { PostFooter, PostHeader } from '../../layout';
import { PostOptions } from '../../layout/common';

type PostContentProps = {
  closeModal?: VoidFunction;
  post: PostExtended;
  variant: 'modal' | 'page';
};

export const PostContent = ({
  closeModal,
  post,
  variant,
}: PostContentProps) => {
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

  return (
    <>
      <div className="h-[calc(100%-113px)] flex-grow bg-black md:h-full">
        {variant === 'modal' && closeModal && (
          <div className="flex-center absolute left-0 top-2 w-full justify-between space-x-4 px-2 md:left-4 md:top-4 md:w-max md:px-0">
            <IconButton
              className="size-10 bg-neutral-900 bg-opacity-50 hover:bg-neutral-700 hover:bg-opacity-50"
              icon={{
                className: 'stroke-2 stroke-white size-full',
                Component: CloseIcon,
                name: 'close',
              }}
              onClick={closeModal}
            />
            <FacebookLogoMark className="hidden size-10 md:block" />
            <div className="only-mobile">
              <PostOptions
                isPostContent
                postId={post.id}
                postSaves={post.savedBy}
                postUserId={post.userId}
              />
            </div>
          </div>
        )}
        {mediaType === 'image' && (
          <Image
            alt="Image"
            className="size-full object-contain"
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
            className="size-full object-contain"
            height={0}
            priority
            sizes="100vw"
            src={media as string}
            unoptimized
            width={0}
          />
        )}
        {mediaType === 'video' && (
          <ReactPlayer
            controls
            loop
            url={media as string}
            width="100%"
            height="100%"
          />
        )}
      </div>
      <div className="md:card-bg absolute bottom-0 flex w-full flex-col bg-neutral-900 bg-opacity-50 md:static md:h-full md:w-96 md:min-w-96 md:bg-transparent">
        <PostHeader
          createdAt={createdAt}
          feeling={feeling as Feeling}
          image={user.image as string}
          isPostContent
          location={location as string}
          name={user.name as string}
          postId={postId}
          postSaves={savedBy}
          postUserId={user.id}
        />
        <p className="primary-text-dark md:primary-text mb-2 pl-3">
          {thoughts}
        </p>
        <PostFooter
          isPostContent
          postComments={comments}
          postLikes={likes}
          postId={post.id}
        />
      </div>
    </>
  );
};
