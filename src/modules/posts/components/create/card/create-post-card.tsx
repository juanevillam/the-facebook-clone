'use client';

import { useRef } from 'react';

import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { NoProfilePicImage } from '@/components/images';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  setStep,
  toggleCreatePostOpenable,
} from '@/lib/store/reducers/posts-reducer';

import { CreatePostCardAction } from './action/create-post-card-action';
import { CreatePostDialog } from '../dialog/create-post-dialog';
import { CreatePostModal } from '../modal/create-post-modal';

export const CreatePostCard = () => {
  const filePicker = useRef<HTMLInputElement>(null);
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { feelings, gifs, media, step, thoughts } = useAppSelector(
    (store) => store.postsReducer
  );

  const handleToggleCreatePostOpenable = () =>
    dispatch(toggleCreatePostOpenable());

  const handleStep = () =>
    step === 'default'
      ? handleToggleCreatePostOpenable()
      : dispatch(setStep('default'));

  const openLiveVideoStep = () =>
    showToast.error(t('toast-messages.error.feature-under-development'));

  const openMediaStep = () => {
    if (gifs.activeGif) {
      showToast.error(
        t.rich('posts.create.actions.disabled', {
          br: () => null,
        }) as string
      );
    } else {
      handleToggleCreatePostOpenable();
      dispatch(setStep('media'));
    }
  };

  const openFeelingsStep = () => {
    handleToggleCreatePostOpenable();
    dispatch(setStep('feelings'));
  };

  return (
    <>
      <div className="bg-white mb-2 pt-3 md:mb-4 md:pb-2.5 md:rounded-lg dark:bg-dark-100">
        <div className="flex items-center pb-3 px-4 space-x-2">
          <NoProfilePicImage />
          <button
            className="bg-transparent border duration-150 flex flex-grow hover:bg-gray-200 overflow-hidden px-3 py-2 rounded-full transition md:bg-gray-100 md:border-none md:dark:bg-dark-200 md:dark:hover:bg-dark-500 dark:border-dark-50 dark:hover:bg-dark-200"
            onClick={handleToggleCreatePostOpenable}
            type="button"
          >
            <p className="text-gray-600 whitespace-nowrap dark:text-gray-400">
              {thoughts ? thoughts : t('posts.create.thoughts-placeholder')}
            </p>
          </button>
        </div>
        <div className="border-t divide-x flex md:divide-x-0 md:space-x-1 md:pt-2 md:mx-4 dark:border-dark-50 dark:divide-dark-50">
          <CreatePostCardAction
            active={false}
            image={{
              alt: t('posts.create.actions.live-video.desktop'),
              src: 'live-video',
            }}
            label={{
              desktop: t('posts.create.actions.live-video.desktop'),
              mobile: t('posts.create.actions.live-video.mobile'),
            }}
            onClick={openLiveVideoStep}
          />
          <CreatePostCardAction
            active={media.file ? true : false}
            disabled={gifs.activeGif ? true : false}
            image={{
              alt: t('posts.create.actions.photo-video.desktop'),
              src: 'photo-video',
            }}
            label={{
              desktop: t('posts.create.actions.photo-video.desktop'),
              mobile: t('posts.create.actions.photo-video.mobile'),
            }}
            onClick={openMediaStep}
          />
          <CreatePostCardAction
            active={feelings.activeFeeling ? true : false}
            image={{
              alt: t('posts.create.actions.feeling-activity.desktop'),
              src: 'feeling-activity',
            }}
            label={{
              desktop: t('posts.create.actions.feeling-activity.desktop'),
              mobile: t('posts.create.actions.feeling-activity.mobile'),
            }}
            onClick={openFeelingsStep}
          />
        </div>
      </div>
      <CreatePostDialog filePicker={filePicker} handleStep={handleStep} />
      <CreatePostModal
        filePicker={filePicker}
        handleStep={handleStep}
        handleToggleCreatePostOpenable={handleToggleCreatePostOpenable}
      />
    </>
  );
};
