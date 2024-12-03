'use client';

import { useState, useEffect } from 'react';

import { Skeleton } from '@mui/material';
import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { ProfilePic, VideoPlayer } from '@/components';
import { useCurrentUser } from '@/hooks';
import { StoryExtended } from '@/modules/posts/post/types';
import { Link } from '@/navigation';

export const StoryCard = ({ id, items, user }: StoryExtended) => {
  const [isHorizontal, setIsHorizontal] = useState<boolean | null>(null);
  const [allViewed, setAllViewed] = useState(false);
  const t = useTranslations('images');
  const currentUser = useCurrentUser();

  const latestItem = items[items.length - 1];

  useEffect(() => {
    if (latestItem.mediaType === 'image') {
      const img = new window.Image();
      img.src = latestItem.media;
      img.onload = () => setIsHorizontal(img.width > img.height);
    }
  }, [latestItem.media, latestItem.mediaType]);

  useEffect(() => {
    const hasViewedAll = items.every((item) =>
      item.views.some((view) => view.userId === currentUser?.id)
    );

    setAllViewed(hasViewedAll);
  }, [currentUser?.id, items]);

  return (
    <Link
      className={classNames(
        'primary-transition group relative h-full min-w-28 overflow-hidden rounded-xl bg-black md:min-w-32',
        {
          'opacity-70': allViewed,
        }
      )}
      href={`/stories/${id}` as any}
    >
      <ProfilePic
        customClassName={classNames(
          'primary-transition absolute left-3 top-3 z-20 shadow-xl ring-[3px]',
          {
            'ring-primary-100': !allViewed,
            'ring-white dark:ring-neutral-800': allViewed,
          }
        )}
        image={user.image as string}
        name={user.name as string}
      />
      {latestItem.mediaType === 'video' ? (
        <VideoPlayer showControls={false} url={latestItem.media} />
      ) : isHorizontal !== null ? (
        <Image
          alt={t('story', {
            name: user.name,
          })}
          className={classNames('primary-transition group-hover:scale-105', {
            'object-contain': isHorizontal,
            'object-cover': !isHorizontal,
          })}
          fill
          sizes="100%"
          priority
          src={latestItem.media}
        />
      ) : (
        <Skeleton className="skeleton-bg size-full" variant="rectangular" />
      )}
      <div className="absolute inset-0 z-20 bg-black/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
};
