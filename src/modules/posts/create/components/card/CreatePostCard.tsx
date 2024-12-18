'use client';

import { useTranslations } from 'next-intl';

import { ProfilePic } from '@/components';
import { IS_PRODUCTION } from '@/constants/environment';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import {
  setCreatePostStep,
  toggleCreatePostOpenable,
} from '../../reducers/createPostPostReducer';
import {
  CreatePostCheckInStep,
  CreatePostDefaultStep,
  CreatePostFeelingsStep,
  CreatePostGifsStep,
  CreatePostMediaStep,
} from '../steps';
import { CreatePostCardItem } from './CreatePostCardItem';
import { CardItem } from '../../types';
import { CreatePostDialog } from '../CreatePostDialog';
import { CreatePostModal } from '../CreatePostModal';

export const CreatePostCard = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { step, thoughts, posting } = useAppSelector(
    (store) => store.posts.createPost.createPostPost
  );

  const { activeGif } = useAppSelector(
    (store) => store.posts.createPost.createPostGifsStep
  );

  const { file } = useAppSelector(
    (store) => store.posts.createPost.createPostMediaStep
  );

  const { activeFeeling } = useAppSelector(
    (store) => store.posts.createPost.createPostFeelingsStep
  );

  const handleToggleOpenable = () =>
    !posting && dispatch(toggleCreatePostOpenable());

  const handleStep = () =>
    step === 'default'
      ? handleToggleOpenable()
      : dispatch(setCreatePostStep('default'));

  const handleOpenMediaStep = () => {
    if (!activeGif) {
      handleToggleOpenable();
      dispatch(setCreatePostStep('media'));
    }
  };

  const handleOpenFeelingsStep = () => {
    handleToggleOpenable();
    dispatch(setCreatePostStep('feelings'));
  };

  const handleOpenGifsStep = () => {
    if (!file) {
      handleToggleOpenable();
      dispatch(setCreatePostStep('gifs'));
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
      disabled: !!file || IS_PRODUCTION,
      name: 'gif',
      onClick: handleOpenGifsStep,
    },
  ];

  const renderStep = () => {
    switch (step) {
      case 'media':
        return <CreatePostMediaStep />;
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
      <div className="card transition-all duration-300">
        <div className="flex-align-center space-x-2 p-3 md:px-4">
          <ProfilePic />
          <button
            aria-label={thoughts || t('posts.create.layout.thoughts')}
            className="border-primary text-primary md:text-accent md:bg-primary hover:bg-secondary flex-grow overflow-hidden whitespace-nowrap rounded-full border px-4 py-2.5 text-start transition-colors duration-200 md:border-none md:px-3 md:py-2"
            onClick={handleToggleOpenable}
            type="button"
          >
            {thoughts || t('posts.create.layout.thoughts')}
          </button>
        </div>
        <div className="border-primary divide-primary flex divide-x border-t md:mx-4 md:space-x-1 md:divide-x-0 md:py-2.5">
          {cardItems.map((item) => (
            <CreatePostCardItem key={item.name} {...item} />
          ))}
        </div>
      </div>
      <CreatePostDialog handleStep={handleStep}>
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
