'use client';

import { useState } from 'react';

import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import {
  ArrowLeftIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  CloseIcon,
} from '@/assets/icons';
import { FacebookLogoMark } from '@/assets/icons/brand';
import { VideoPlayer } from '@/components';
import { IconButton } from '@/components/buttons';
import { Feeling } from '@/modules/posts/create/types';
import { PostExtended, PostVariant } from '@/modules/posts/post/types';
import { Link, useRouter } from '@/navigation';

import { PostBody, PostFooter, PostHeader } from './layout';
import { PostOptions } from './layout/shared';

type PostContentProps = {
  closeModal?: VoidFunction;
  post: PostExtended;
  variant: PostVariant;
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

  const [expanded, setExpanded] = useState(false);
  const t = useTranslations();
  const router = useRouter();

  const handleExpand = () => setExpanded(!expanded);

  const navigateToHome = () => router.push('/');

  return (
    <>
      {variant === 'page' && (
        <div className="card-bg only-mobile h-full min-h-screen">
          <div className="flex-center primary-border space-x-1.5 border-b p-1.5">
            <IconButton
              className="hover:primary-bg size-10"
              icon={{
                ariaLabel: 'go-back-to-home',
                className: 'stroke-[2.5] primary-stroke size-full',
                Component: ArrowLeftIcon,
              }}
              onClick={navigateToHome}
            />
            <h1 className="primary-text text-lg font-semibold">{user.name}</h1>
          </div>
          <PostHeader
            createdAt={createdAt}
            feeling={feeling as Feeling}
            image={user.image as string}
            location={location as string}
            name={user.name as string}
            postId={postId}
            postSaves={savedBy}
            postUserId={user.id}
            username={user.username as string}
            variant="page"
          />
          <PostBody
            media={media as string}
            mediaType={mediaType as string}
            postId={postId}
            thoughts={thoughts as string}
          />
          <PostFooter
            postComments={comments}
            postLikes={likes}
            postId={postId}
            variant={variant}
          />
        </div>
      )}
      <div
        className={classNames('size-full', {
          flex: variant === 'modal',
          'only-desktop': variant === 'page',
        })}
      >
        <div className="relative flex-grow bg-black">
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
              <div className="flex-center z-20 space-x-4">
                <IconButton
                  className="size-10 bg-neutral-900 bg-opacity-50 hover:bg-neutral-700 hover:bg-opacity-50"
                  icon={{
                    ariaLabel: 'close-post',
                    className: 'stroke-2 stroke-white size-full',
                    Component: CloseIcon,
                  }}
                  onClick={closeModal}
                />
                <Link aria-label={t('logos.link-aria-label')} href="/">
                  <FacebookLogoMark className="hidden size-10 md:block" />
                </Link>
              </div>
            )}
            <IconButton
              className="only-desktop z-20 size-10 bg-neutral-900 bg-opacity-50 hover:bg-neutral-700 hover:bg-opacity-50"
              icon={{
                ariaLabel: expanded ? 'collapse-post' : 'expand-post',
                className: 'stroke-white fill-white size-full',
                Component: expanded
                  ? ArrowsPointingInIcon
                  : ArrowsPointingOutIcon,
              }}
              onClick={handleExpand}
            />
            {variant === 'modal' && (
              <div className="only-mobile z-20">
                <PostOptions
                  isModal
                  postId={post.id}
                  postSaves={post.savedBy}
                  postUserId={post.userId}
                />
              </div>
            )}
          </div>
          {mediaType === 'image' && (
            <Image
              alt={t('images.user-image')}
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
              alt={t('images.user-gif')}
              className="size-full object-contain"
              height={0}
              priority
              sizes="100vw"
              src={media as string}
              unoptimized
              width={0}
            />
          )}
          {mediaType === 'video' && media && <VideoPlayer url={media} />}
        </div>
        <div
          className={classNames(
            'md:card-bg absolute bottom-0 flex w-full flex-col bg-neutral-900/50 md:static md:h-full md:bg-transparent',
            {
              'md:w-0': expanded,
              'md:w-96 md:min-w-96': !expanded,
              'hidden md:block': mediaType === 'video',
            }
          )}
        >
          <PostHeader
            createdAt={createdAt}
            feeling={feeling as Feeling}
            image={user.image as string}
            location={location as string}
            name={user.name as string}
            postId={postId}
            postSaves={savedBy}
            postUserId={user.id}
            username={user.username as string}
            variant={variant}
          />
          {thoughts && (
            <p className="primary-text-dark md:primary-text mb-2 pl-3">
              {thoughts}
            </p>
          )}
          <PostFooter
            postComments={comments}
            postLikes={likes}
            postId={post.id}
            variant={variant}
          />
        </div>
      </div>
    </>
  );
};
