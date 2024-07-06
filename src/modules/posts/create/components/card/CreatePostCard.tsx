'use client';

import { useRef, useCallback } from 'react';

import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { ActionLoader, ProfilePic } from '@/components';
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
import {
  CreatePostCheckInStep,
  CreatePostDefaultStep,
  CreatePostFeelingsStep,
  CreatePostGifsStep,
  CreatePostMediaStep,
} from '../steps';

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
      name: 'photo-video',
      onClick: handleOpenMediaStep,
    },
    {
      active: !!activeFeeling,
      name: 'feeling-activity',
      onClick: handleOpenFeelingsStep,
    },
  ];

  const RenderStep = () => {
    switch (step) {
      case 'media':
        return <CreatePostMediaStep fileInputRef={fileInputRef} />;
      case 'feelings':
        return <CreatePostFeelingsStep />;
      case 'check-in':
        return <CreatePostCheckInStep />;
      case 'gifs':
        return <CreatePostGifsStep />;
      case 'default':
      default:
        return <CreatePostDefaultStep />;
    }
  };

  return (
    <>
      <div className="card">
        <div className="flex-center p-3 md:px-4 space-x-2">
          <ProfilePic />
          <button
            aria-label={thoughts || tLayout('thoughts')}
            className="border main-border md:border-none main-transition flex-grow overflow-hidden px-4 md:px-3 py-2.5 md:py-2 rounded-full text-start md:main-bg hover:main-bg-hover"
            onClick={handleToggleOpenable}
            type="button"
          >
            <p className="text-gray-600 dark:text-neutral-100 md:text-neutral-500 md:dark:text-neutral-300 whitespace-nowrap">
              {thoughts || tLayout('thoughts')}
            </p>
          </button>
        </div>
        <div className="flex border-t main-border divide-x main-divide md:divide-x-0 md:mx-4 md:py-2.5 md:space-x-1">
          {cardItems.map((item) => (
            <CreatePostCardItem key={item.name} {...item} />
          ))}
        </div>
      </div>
      <CreatePostDialog
        handleStep={handleStep}
        handleToggleOpenable={handleToggleOpenable}
      >
        <RenderStep />
      </CreatePostDialog>
      <CreatePostModal
        handleStep={handleStep}
        handleToggleOpenable={handleToggleOpenable}
      >
        <RenderStep />
      </CreatePostModal>
    </>
  );
};
