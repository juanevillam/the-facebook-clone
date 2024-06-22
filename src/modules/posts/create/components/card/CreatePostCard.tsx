'use client';

import { useRef, useCallback } from 'react';

import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { NoProfilePicImage } from '@/components/images';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { CreatePostCardItem } from './item/CreatePostCardItem';
import { setStep, toggleOpenable } from '../../reducers/postSlice';
import { CreatePostDialog } from '../dialog/CreatePostDialog';
import { CreatePostModal } from '../modal/CreatePostModal';

export const CreatePostCard = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const { step, thoughts } = useAppSelector((store) => store.posts.create.post);
  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);
  const { file } = useAppSelector((store) => store.posts.create.media);
  const { activeFeeling } = useAppSelector(
    (store) => store.posts.create.feelings
  );

  const handleToggleOpenable = useCallback(() => {
    dispatch(toggleOpenable());
  }, [dispatch]);

  const handleStep = useCallback(() => {
    step === 'default' ? handleToggleOpenable() : dispatch(setStep('default'));
  }, [dispatch, handleToggleOpenable, step]);

  const handleOpenLiveVideoStep = useCallback(() => {
    showToast.error(t('toast-messages.error.feature-under-development'));
  }, [t]);

  const handleOpenMediaStep = useCallback(() => {
    if (activeGif) {
      showToast.error(
        t.rich('posts.create.actions.disabled', {
          br: () => null,
        }) as string
      );
    } else {
      handleToggleOpenable();
      dispatch(setStep('media'));
    }
  }, [activeGif, dispatch, handleToggleOpenable, t]);

  const handleOpenFeelingsStep = useCallback(() => {
    handleToggleOpenable();
    dispatch(setStep('feelings'));
  }, [dispatch, handleToggleOpenable]);

  return (
    <>
      <div className="bg-white mb-2 pt-3 dark:bg-dark-100 md:mb-4 md:pb-2.5 md:rounded-lg">
        <div className="flex items-center pb-3 px-4 space-x-2">
          <NoProfilePicImage />
          <button
            className="bg-transparent border duration-150 flex flex-grow hover:bg-gray-200 overflow-hidden px-3 py-2 rounded-full transition dark:border-dark-50 dark:hover:bg-dark-200 md:bg-gray-100 md:border-none md:dark:bg-dark-200 md:dark:hover:bg-dark-500"
            onClick={handleToggleOpenable}
            type="button"
            aria-label={
              thoughts ? thoughts : t('posts.create.thoughts-placeholder')
            }
          >
            <p className="text-gray-600 whitespace-nowrap dark:text-gray-400">
              {thoughts ? thoughts : t('posts.create.thoughts-placeholder')}
            </p>
          </button>
        </div>
        <div className="border-t divide-x flex dark:border-dark-50 dark:divide-dark-50 md:divide-x-0 md:space-x-1 md:pt-2 md:mx-4">
          <CreatePostCardItem
            active={false}
            image={{
              alt: t('posts.create.actions.live-video.desktop'),
              src: 'live-video',
            }}
            label={{
              desktop: t('posts.create.actions.live-video.desktop'),
              mobile: t('posts.create.actions.live-video.mobile'),
            }}
            onClick={handleOpenLiveVideoStep}
          />
          <CreatePostCardItem
            active={!!file}
            disabled={!!activeGif}
            image={{
              alt: t('posts.create.actions.photo-video.desktop'),
              src: 'photo-video',
            }}
            label={{
              desktop: t('posts.create.actions.photo-video.desktop'),
              mobile: t('posts.create.actions.photo-video.mobile'),
            }}
            onClick={handleOpenMediaStep}
          />
          <CreatePostCardItem
            active={!!activeFeeling}
            image={{
              alt: t('posts.create.actions.feeling-activity.desktop'),
              src: 'feeling-activity',
            }}
            label={{
              desktop: t('posts.create.actions.feeling-activity.desktop'),
              mobile: t('posts.create.actions.feeling-activity.mobile'),
            }}
            onClick={handleOpenFeelingsStep}
          />
        </div>
      </div>
      <CreatePostDialog fileInputRef={fileInputRef} handleStep={handleStep} />
      <CreatePostModal
        fileInputRef={fileInputRef}
        handleStep={handleStep}
        handleToggleOpenable={handleToggleOpenable}
      />
    </>
  );
};
