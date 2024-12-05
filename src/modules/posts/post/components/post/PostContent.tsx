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
    id,
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

  const toggleExpand = () => setExpanded((prev) => !prev);

  const navigateToHome = () => router.push('/');

  const renderMediaContent = () => {
    switch (mediaType) {
      case 'image':
        return (
          <Image
            alt={t('images.user-image', {
              user: user.name,
            })}
            className="size-full object-contain"
            height={0}
            priority
            sizes="100vw"
            src={media as string}
            width={0}
          />
        );
      case 'gif':
        return (
          <Image
            alt={t('images.user-gif', {
              user: user.name,
            })}
            className="size-full object-contain"
            height={0}
            priority
            sizes="100vw"
            src={media as string}
            unoptimized
            width={0}
          />
        );
      case 'video':
        return media && <VideoPlayer url={media} />;
      default:
        return null;
    }
  };

  return (
    <>
      {variant === 'page' && (
        <div className="card-bg only-mobile h-full min-h-screen">
          <header className="flex-center primary-border space-x-1.5 border-b p-1.5">
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
          </header>
          <PostHeader post={post} variant="page" />
          <PostBody post={post} />
          <PostFooter post={post} variant={variant} />
        </div>
      )}
      <div
        className={classNames('size-full', {
          flex: variant === 'modal',
          'only-desktop': variant === 'page',
        })}
      >
        <div className="relative flex-grow bg-black">
          <header
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
                <Link aria-label={t('links.navigate-to-home-page')} href="/">
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
              onClick={toggleExpand}
            />
            {variant === 'modal' && (
              <div className="only-mobile z-20">
                <PostOptions
                  isModal
                  postId={id}
                  postSaves={savedBy}
                  postUserId={user.id}
                />
              </div>
            )}
          </header>
          {renderMediaContent()}
        </div>
        <aside
          className={classNames(
            'md:card-bg absolute bottom-0 flex w-full flex-col bg-neutral-900/50 md:static md:h-full md:bg-transparent',
            {
              'md:w-0': expanded,
              'md:w-96 md:min-w-96': !expanded,
              'hidden md:block': mediaType === 'video',
            }
          )}
        >
          <PostHeader post={post} variant={variant} />
          {thoughts && (
            <p className="primary-text-dark md:primary-text mb-2 pl-3">
              {thoughts}
            </p>
          )}
          <PostFooter post={post} variant={variant} />
        </aside>
      </div>
    </>
  );
};
