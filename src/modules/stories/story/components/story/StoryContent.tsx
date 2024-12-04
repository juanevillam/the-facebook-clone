'use client';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { ArrowLeftIcon, CloseIcon } from '@/assets/icons';
import { FacebookLogoMark } from '@/assets/icons/brand';
import { IconButton } from '@/components/buttons';
import { StoryExtended } from '@/modules/posts/post/types';
import { StoryVariant } from '@/modules/stories/story/types';
import { Link, useRouter } from '@/navigation';

import { StoryPlayer } from './player/StoryPlayer';

type StoryContentProps = {
  closeModal?: VoidFunction;
  story: StoryExtended;
  variant: StoryVariant;
};

export const StoryContent = ({
  closeModal,
  story,
  variant,
}: StoryContentProps) => {
  const { items, user } = story;
  const t = useTranslations('logos');
  const router = useRouter();

  const navigateToHome = () => router.push('/');

  return (
    <div
      className={classNames('flex size-full', {
        'md:py-6': variant === 'modal',
        'flex-col md:flex-row md:py-4': variant === 'page',
      })}
    >
      {variant === 'page' && (
        <div className="only-mobile card-bg primary-transition flex-center primary-border space-x-1.5 border-b p-1.5">
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
      )}
      {variant === 'modal' && (
        <div className="only-desktop flex-center absolute top-2 z-20 space-x-4 px-2 md:top-3 md:px-4">
          <IconButton
            className="size-10 bg-neutral-900 bg-opacity-50 hover:bg-neutral-700 hover:bg-opacity-50"
            icon={{
              ariaLabel: 'close-story',
              className: 'stroke-2 stroke-white size-full',
              Component: CloseIcon,
            }}
            onClick={closeModal}
          />
          <Link aria-label={t('link-aria-label')} href="/">
            <FacebookLogoMark className="size-10" />
          </Link>
        </div>
      )}
      <StoryPlayer
        items={items}
        onEnd={closeModal ? closeModal : undefined}
        user={user}
      />
    </div>
  );
};
