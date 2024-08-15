'use client';

import { useRef } from 'react';

import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { ProfilePic } from '@/components';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { CreatePostCardItem } from './item/CreatePostCardItem';
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
  const dispatch = useAppDispatch();
  const { step, thoughts, posting } = useAppSelector(
    (store) => store.posts.create.post
  );

  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);
  const { file } = useAppSelector((store) => store.posts.create.media);
  const { activeFeeling } = useAppSelector(
    (store) => store.posts.create.feelings
  );

  const handleToggleOpenable = () => !posting && dispatch(toggleOpenable());

  const handleStep = () =>
    step === 'default' ? handleToggleOpenable() : dispatch(setStep('default'));

  const handleOpenLiveVideoStep = () =>
    showToast.error(t('toast-messages.error.feature-under-development'));

  const handleOpenMediaStep = () => {
    if (activeGif) {
      showToast.error(
        t.rich('posts.create.layout.footer.disabled', {
          br: () => null,
        }) as string
      );
    } else {
      handleToggleOpenable();
      dispatch(setStep('media'));
    }
  };

  const handleOpenFeelingsStep = () => {
    handleToggleOpenable();
    dispatch(setStep('feelings'));
  };

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

  const renderStep = () => {
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
            aria-label={thoughts || t('posts.create.layout.thoughts')}
            className="border md:border-none primary-border primary-text md:accent-text primary-transition flex-grow overflow-hidden px-4 md:px-3 py-2.5 md:py-2 rounded-full text-start whitespace-nowrap md:primary-bg hover:secondary-bg"
            onClick={handleToggleOpenable}
            type="button"
          >
            {thoughts || t('posts.create.layout.thoughts')}
          </button>
        </div>
        <div className="border-t primary-border divide-x md:divide-x-0 primary-divide flex md:mx-4 md:py-2.5 md:space-x-1">
          {cardItems.map((item) => (
            <CreatePostCardItem key={item.name} {...item} />
          ))}
        </div>
      </div>
      <CreatePostDialog
        handleStep={handleStep}
        handleToggleOpenable={handleToggleOpenable}
      >
        {renderStep()}
      </CreatePostDialog>
      <CreatePostModal
        handleStep={handleStep}
        handleToggleOpenable={handleToggleOpenable}
      >
        {renderStep()}
      </CreatePostModal>
    </>
  );
};
