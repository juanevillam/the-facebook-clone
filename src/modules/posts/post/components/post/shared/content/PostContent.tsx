'use client';

import { useState } from 'react';

import classNames from 'classnames';
import Image from 'next/image';
import ReactPlayer from 'react-player';

import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  CloseIcon,
} from '@/assets/ui/icons';
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

  const [fullScreen, setFullScreen] = useState(false);

  const handleFullScreen = () => setFullScreen(!fullScreen);

  return (
    <>
      <div className="relative h-[calc(100%-113px)] flex-grow bg-black md:h-full">
        <div
          className={classNames(
            'flex-center absolute top-2 w-full px-2 md:top-3 md:w-full md:px-4',
            {
              'justify-between': variant === 'modal',
              'justify-end': variant === 'page',
            }
          )}
        >
          {variant === 'modal' && (
            <div className="flex-center space-x-4">
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
            </div>
          )}
          <IconButton
            className="only-desktop size-10 bg-neutral-900 bg-opacity-50 hover:bg-neutral-700 hover:bg-opacity-50"
            icon={{
              className: 'fill-white size-full',
              Component: fullScreen
                ? ArrowsPointingInIcon
                : ArrowsPointingOutIcon,
              name: fullScreen ? 'arrows-pointing-in' : 'arrows-pointing-out',
            }}
            onClick={handleFullScreen}
          />
          {variant === 'modal' && (
            <div className="only-mobile">
              <PostOptions
                isPostContent
                postId={post.id}
                postSaves={post.savedBy}
                postUserId={post.userId}
              />
            </div>
          )}
        </div>
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
      <div
        className={classNames(
          'md:card-bg absolute bottom-0 flex w-full flex-col bg-neutral-900 bg-opacity-50 md:static md:h-full md:bg-transparent',
          {
            'md:w-0': fullScreen,
            'md:w-96 md:min-w-96': !fullScreen,
          }
        )}
      >
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
