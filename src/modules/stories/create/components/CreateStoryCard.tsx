'use client';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { PlusIcon } from '@/assets/ui/icons';
import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { CreateStoryDialog } from './CreateStoryDialog';
import { CreateStoryModal } from './CreateStoryModal';
import { toggleCreateStoryOpenable } from '../reducers/createStoryStorySlice';

type CreateStoryCardProps = {
  variant?: 'card' | 'list';
};

export const CreateStoryCard = ({ variant = 'card' }: CreateStoryCardProps) => {
  const t = useTranslations('stories.create.card');
  const currentUser = useCurrentUser();
  const dispatch = useAppDispatch();
  const { posting } = useAppSelector(
    (store) => store.stories.createStory.createStoryStory
  );

  const handleToggleOpenable = () =>
    !posting && dispatch(toggleCreateStoryOpenable());

  return (
    <div className="flex h-full">
      <div
        className={classNames({
          'card w-full md:p-2.5': variant === 'card',
          'primary-bg md:card-bg primary-transition min-w-28 overflow-hidden rounded-xl md:min-w-32':
            variant === 'list',
        })}
      >
        <button
          className={classNames(
            'primary-transition group relative flex h-full w-full p-3 md:rounded-lg md:px-2 md:py-1.5',
            {
              'hover:primary-bg space-x-2.5 md:space-x-3': variant === 'card',
            }
          )}
          onClick={handleToggleOpenable}
          type="button"
        >
          {variant === 'list' && (
            <ProfilePic
              customClassName="absolute top-0 left-0 object-cover w-full h-3/4 md:h-2/3 rounded-none primary-transition group-hover:scale-105"
              image={currentUser?.image as string}
              name={currentUser?.name as string}
            />
          )}
          <div
            className={classNames('primary-transition', {
              'primary-bg md:card-bg absolute bottom-8 left-1/2 -translate-x-1/2 transform rounded-full p-1 md:bottom-10':
                variant === 'list',
            })}
          >
            <PlusIcon
              className={classNames(
                'primary-transition rounded-full stroke-1',
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
            <h1
              className={classNames(
                'primary-text primary-transition font-semibold md:text-lg',
                {
                  hidden: variant === 'list',
                }
              )}
            >
              {t('title')}
            </h1>
            <h1
              className={classNames(
                'primary-text primary-transition absolute bottom-3 left-1/2 w-full -translate-x-1/2 transform text-center text-xs font-semibold md:text-sm',
                {
                  hidden: variant === 'card',
                }
              )}
            >
              {t('title-short')}
            </h1>
            {variant === 'card' && (
              <p className="tertiary-text primary-transition md:text-md text-sm">
                {t('subtitle')}
              </p>
            )}
          </div>
          {variant === 'list' && (
            <div className="absolute inset-0 z-20 bg-black/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          )}
        </button>
      </div>
      <CreateStoryModal handleToggleOpenable={handleToggleOpenable} />
      <CreateStoryDialog handleToggleOpenable={handleToggleOpenable} />
    </div>
  );
};
