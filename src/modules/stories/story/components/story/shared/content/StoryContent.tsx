'use client';

import classNames from 'classnames';

import { CloseIcon } from '@/assets/ui/icons';
import { FacebookLogoMark } from '@/assets/ui/icons/brand';
import { IconButton } from '@/components/buttons';
import { StoryExtended } from '@/modules/posts/post/assets/types';
import { StoryVariant } from '@/modules/stories/story/types';
import { Link } from '@/navigation';

import { ImagePlayer } from '../player/StoryPlayer';

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

  return (
    <div
      className={classNames('flex size-full', {
        'md:py-6': variant === 'modal',
        'md:py-4': variant === 'page',
      })}
    >
      <div className="flex-center absolute top-2 px-2 md:top-3 md:px-4">
        {variant === 'modal' && (
          <div className="only-desktop flex-center z-20 space-x-4">
            <IconButton
              className="size-10 bg-neutral-900 bg-opacity-50 hover:bg-neutral-700 hover:bg-opacity-50"
              icon={{
                className: 'stroke-2 stroke-white size-full',
                Component: CloseIcon,
                name: 'close',
              }}
              onClick={closeModal}
            />
            <Link href="/">
              <FacebookLogoMark className="size-10" />
            </Link>
          </div>
        )}
      </div>
      <ImagePlayer
        items={items}
        onEnd={closeModal ? closeModal : () => {}}
        user={user}
      />
    </div>
  );
};
