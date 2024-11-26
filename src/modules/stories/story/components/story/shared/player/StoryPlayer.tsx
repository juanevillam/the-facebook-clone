'use client';

import { useState, useEffect, useRef } from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import { StoryItem, User } from '@prisma/client';
import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/ui/icons';
import { ProfilePic } from '@/components';
import { markStoryAsViewed } from '@/modules/stories/story/actions';
import { getStoryTimeAgo } from '@/modules/stories/story/utils';
import { Link } from '@/navigation';

type ImagePlayerProps = {
  items: StoryItem[];
  onEnd: VoidFunction;
  user: User;
};

const STORY_DURATION = 6;

export const ImagePlayer = ({ items, onEnd, user }: ImagePlayerProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isNextCalled = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState<boolean | null>(null);
  const t = useTranslations('images');

  const currentItem = items[currentIndex];

  const handlePrev = () =>
    currentIndex > 0 && setCurrentIndex((prev) => prev - 1);

  const handleNext = () => {
    if (isNextCalled.current) return;

    isNextCalled.current = true;

    currentIndex < items.length - 1
      ? setCurrentIndex((prev) => prev + 1)
      : onEnd();

    setTimeout(() => (isNextCalled.current = false), 50);
  };

  useEffect(() => {
    const duration = STORY_DURATION * 1000;

    setProgress(0);

    intervalRef.current && clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 100 / (duration / 100);
        } else {
          clearInterval(intervalRef.current!);
          handleNext();

          return 100;
        }
      });
    }, 100);

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    const markAsViewed = async () =>
      !currentItem.viewed && (await markStoryAsViewed(currentItem.id));

    markAsViewed();
  }, [currentItem]);

  useEffect(() => {
    if (currentItem.mediaType === 'image') {
      const img = new window.Image();

      img.src = currentItem.media;

      img.onload = () => setIsHorizontal(img.width > img.height);
    } else setIsHorizontal(null);
  }, [currentItem.media, currentItem.mediaType]);

  return (
    <div className="flex size-full justify-center">
      <div className="only-desktop w-60">
        {currentIndex !== 0 && (
          <button
            className="group flex w-full items-center justify-end px-10"
            onClick={handlePrev}
            type="button"
          >
            <ChevronLeftIcon className="card-bg primary-transition primary-border secondary-stroke group-hover:secondary-bg size-12 rounded-full border-[0.8px] fill-none stroke-2 p-3 shadow-lg group-hover:translate-x-[-4px]" />
          </button>
        )}
      </div>
      {currentItem && (
        <div className="relative min-w-full overflow-hidden bg-black md:min-w-96 md:rounded-xl">
          <div className="absolute top-0 z-20 w-full space-y-3 px-3 md:pt-1">
            <div className="absolute inset-0 -z-10 h-40 bg-gradient-to-b from-black/30 to-transparent" />
            <div className="flex w-full space-x-1.5">
              {items.map((_, index) => (
                <div key={index} className="flex-1">
                  <LinearProgress
                    className="!h-[5px] rounded-full !bg-white/50"
                    variant="determinate"
                    sx={{
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#FFFFFF',
                      },
                    }}
                    value={
                      currentIndex === index
                        ? progress
                        : currentIndex > index
                          ? 100
                          : 0
                    }
                  />
                </div>
              ))}
            </div>
            <div className="flex-center space-x-2.5">
              <ProfilePic
                image={user.image as string}
                name={user.name as string}
              />
              <Link href={`/${user.username}` as any}>
                <h1 className="text-lg font-semibold text-white hover:underline">
                  {user.name}
                </h1>
              </Link>
              <p className="text-sm font-medium text-white">
                {getStoryTimeAgo(currentItem.createdAt)}
              </p>
            </div>
          </div>
          {currentIndex !== 0 && (
            <div className="only-mobile absolute left-0 top-0 z-10 h-full w-1/2">
              <button
                className="size-full"
                onClick={handlePrev}
                type="button"
              />
            </div>
          )}
          <div className="only-mobile absolute right-0 top-0 z-10 h-full w-1/2">
            <button className="size-full" onClick={handleNext} type="button" />
          </div>
          {isHorizontal !== null && (
            <Image
              alt={t('story-item', {
                name: user.name,
                index: currentIndex + 1,
              })}
              className={classNames({
                'object-contain': isHorizontal,
                'object-cover': !isHorizontal,
              })}
              fill
              priority
              sizes="100%"
              src={currentItem.media}
            />
          )}
        </div>
      )}
      <div className="only-desktop w-60">
        {currentIndex !== items.length - 1 && (
          <button
            className="group flex w-full items-center justify-start px-10"
            onClick={handleNext}
            type="button"
          >
            <ChevronRightIcon className="card-bg primary-transition primary-border secondary-stroke group-hover:secondary-bg size-12 rounded-full border-[0.8px] fill-none stroke-2 p-3 shadow-lg group-hover:translate-x-[4px]" />
          </button>
        )}
      </div>
    </div>
  );
};
