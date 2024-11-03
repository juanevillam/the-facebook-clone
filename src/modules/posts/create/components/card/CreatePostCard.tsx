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

  const isProduction = process.env.NODE_ENV === 'production';

  const handleToggleOpenable = () => !posting && dispatch(toggleOpenable());

  const handleStep = () =>
    step === 'default' ? handleToggleOpenable() : dispatch(setStep('default'));

  const handleOpenMediaStep = () => {
    if (!activeGif) {
      handleToggleOpenable();
      dispatch(setStep('media'));
    }
  };

  const handleOpenFeelingsStep = () => {
    handleToggleOpenable();
    dispatch(setStep('feelings'));
  };

  const handleOpenGifsStep = () => {
    if (!file && !isProduction) {
      handleToggleOpenable();
      dispatch(setStep('gifs'));
    }
  };

  const cardItems: CardItem[] = [
    {
      active: !!file,
      disabled: !!activeGif,
      name: 'photo-video',
      onClick: handleOpenMediaStep,
    },
    {
      active: !!activeFeeling,
      name: 'feeling',
      onClick: handleOpenFeelingsStep,
    },
    {
      active: !!activeGif,
      disabled: !!file || isProduction,
      name: 'gif',
      onClick: handleOpenGifsStep,
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
        <div className="flex-center space-x-2 p-3 md:px-4">
          <ProfilePic />
          <button
            aria-label={thoughts || t('posts.create.layout.thoughts')}
            className="primary-border primary-text md:accent-text primary-transition md:primary-bg hover:secondary-bg flex-grow overflow-hidden whitespace-nowrap rounded-full border px-4 py-2.5 text-start md:border-none md:px-3 md:py-2"
            onClick={handleToggleOpenable}
            type="button"
          >
            {thoughts || t('posts.create.layout.thoughts')}
          </button>
        </div>
        <div className="primary-border primary-divide flex divide-x border-t md:mx-4 md:space-x-1 md:divide-x-0 md:py-2.5">
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
