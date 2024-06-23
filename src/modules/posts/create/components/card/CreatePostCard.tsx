'use client';

import { useRef, useCallback } from 'react';

import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { NoProfilePicImage } from '@/components/images';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { CreatePostCardItem } from './item/CreatePostCardItem';
import {
  POSTS_CREATE_LAYOUT_FOOTER_ITEMS_PATH,
  POSTS_CREATE_LAYOUT_PATH,
} from '../../assets/translations';
import { CardItem } from '../../assets/types';
import { setStep, toggleOpenable } from '../../reducers/postSlice';
import { CreatePostDialog } from '../dialog/CreatePostDialog';
import { CreatePostModal } from '../modal/CreatePostModal';

export const CreatePostCard = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();
  const tFooterItems = useTranslations(POSTS_CREATE_LAYOUT_FOOTER_ITEMS_PATH);
  const tLayout = useTranslations(POSTS_CREATE_LAYOUT_PATH);
  const dispatch = useAppDispatch();

  const { step, thoughts, posting } = useAppSelector(
    (store) => store.posts.create.post
  );

  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);
  const { file } = useAppSelector((store) => store.posts.create.media);
  const { activeFeeling } = useAppSelector(
    (store) => store.posts.create.feelings
  );

  const handleToggleOpenable = useCallback(() => {
    !posting && dispatch(toggleOpenable());
  }, [dispatch, posting]);

  const handleStep = useCallback(() => {
    step === 'default' ? handleToggleOpenable() : dispatch(setStep('default'));
  }, [dispatch, handleToggleOpenable, step]);

  const handleOpenLiveVideoStep = useCallback(() => {
    showToast.error(t('toast-messages.error.feature-under-development'));
  }, [t]);

  const handleOpenMediaStep = useCallback(() => {
    if (activeGif) {
      showToast.error(
        tFooterItems.rich('disabled', {
          br: () => null,
        }) as string
      );
    } else {
      handleToggleOpenable();
      dispatch(setStep('media'));
    }
  }, [activeGif, dispatch, handleToggleOpenable, tFooterItems]);

  const handleOpenFeelingsStep = useCallback(() => {
    handleToggleOpenable();
    dispatch(setStep('feelings'));
  }, [dispatch, handleToggleOpenable]);

  const cardItems: CardItem[] = [
    {
      active: false,
      name: 'live-video',
      onClick: handleOpenLiveVideoStep,
    },
    {
      active: !!file,
      disabled: !!activeGif,
      name: 'photo-video',
      onClick: handleOpenMediaStep,
    },
    {
      active: !!activeFeeling,
      name: 'feeling-activity',
      onClick: handleOpenFeelingsStep,
    },
  ];

  return (
    <>
      <div className="bg-white mb-2 pt-3 dark:bg-dark-100 md:mb-4 md:pb-2.5 md:rounded-lg">
        <div className="flex items-center pb-3 px-4 space-x-2">
          <NoProfilePicImage />
          <button
            aria-label={thoughts || tLayout('thoughts')}
            className="bg-transparent border duration-150 flex flex-grow hover:bg-gray-200 overflow-hidden px-3 py-2 rounded-full transition dark:border-dark-50 dark:hover:bg-dark-200 md:bg-gray-100 md:border-none md:dark:bg-dark-200 md:dark:hover:bg-dark-500"
            onClick={handleToggleOpenable}
            type="button"
          >
            <p className="text-gray-600 whitespace-nowrap dark:text-gray-400">
              {thoughts || tLayout('thoughts')}
            </p>
          </button>
        </div>
        <div className="border-t divide-x flex dark:border-dark-50 dark:divide-dark-50 md:divide-x-0 md:space-x-1 md:pt-2 md:mx-4">
          {cardItems.map((item) => (
            <CreatePostCardItem key={item.name} {...item} />
          ))}
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
