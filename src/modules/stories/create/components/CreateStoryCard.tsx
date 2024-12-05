'use client';

import { AriaRole } from 'react';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { PlusIcon } from '@/assets/icons';
import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { CreateStoryDialog } from './CreateStoryDialog';
import { CreateStoryModal } from './CreateStoryModal';
import { toggleCreateStoryOpenable } from '../reducers/createStoryStoryReducer';

type CreateStoryCardProps = {
  role?: AriaRole;
  variant?: 'card' | 'list';
};

export const CreateStoryCard = ({
  role,
  variant = 'card',
}: CreateStoryCardProps) => {
  const t = useTranslations('stories.create.card');
  const currentUser = useCurrentUser();
  const dispatch = useAppDispatch();
  const { posting } = useAppSelector(
    (store) => store.stories.createStory.createStoryStory
  );

  const handleToggleOpenable = () =>
    !posting && dispatch(toggleCreateStoryOpenable());

  return (
    <section
      aria-labelledby="create-story-card-title"
      className="flex h-full"
      role={role}
    >
      <article
        className={classNames({
          'card w-full md:p-2.5': variant === 'card',
          'bg-primary md:bg-card transition-primary min-w-28 overflow-hidden rounded-xl md:min-w-32':
            variant === 'list',
        })}
      >
        <button
          aria-label={t('title')}
          className={classNames(
            'transition-primary group relative flex h-full w-full p-3 md:rounded-lg md:px-2 md:py-1.5',
            {
              'hover:bg-primary space-x-2.5 md:space-x-3': variant === 'card',
            }
          )}
          onClick={handleToggleOpenable}
          type="button"
        >
          {variant === 'list' && (
            <ProfilePic
              customClassName="absolute top-0 left-0 object-cover w-full h-3/4 md:h-2/3 rounded-none transition-primary group-hover:scale-105"
              image={currentUser?.image as string}
              name={currentUser?.name as string}
            />
          )}
          <div
            className={classNames('transition-primary', {
              'bg-primary md:bg-card absolute bottom-8 left-1/2 -translate-x-1/2 transform rounded-full p-1 md:bottom-10':
                variant === 'list',
            })}
          >
            <PlusIcon
              aria-hidden="true"
              className={classNames(
                'transition-primary rounded-full stroke-1',
                {
                  'size-11 bg-primary-500 fill-primary-100 stroke-primary-100 p-3 md:size-12 dark:bg-primary-300':
                    variant === 'card',
                  'mx-auto size-8 bg-primary-100 fill-white stroke-white p-2 md:size-10':
                    variant === 'list',
                }
              )}
            />
          </div>
          <div className="-mt-px text-justify">
            <h2
              className={classNames(
                'text-primary transition-primary font-semibold md:text-lg',
                {
                  hidden: variant === 'list',
                }
              )}
              id="create-story-card-title"
            >
              {t('title')}
            </h2>
            <p
              className={classNames(
                'text-primary transition-primary absolute bottom-3 left-1/2 w-full -translate-x-1/2 transform text-center text-xs font-semibold md:text-sm',
                {
                  hidden: variant === 'card',
                }
              )}
            >
              {t('title-short')}
            </p>
            {variant === 'card' && (
              <p className="text-tertiary transition-primary md:text-md text-sm">
                {t('subtitle')}
              </p>
            )}
          </div>
          {variant === 'list' && (
            <div className="absolute inset-0 z-20 bg-black/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          )}
        </button>
      </article>
      <CreateStoryModal handleToggleOpenable={handleToggleOpenable} />
      <CreateStoryDialog handleToggleOpenable={handleToggleOpenable} />
    </section>
  );
};
