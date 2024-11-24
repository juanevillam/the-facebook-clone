'use client';

import { useTranslations } from 'next-intl';

import { ProfilePic } from '@/components';
import { IS_PRODUCTION } from '@/constants/environment';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { CreatePostCardItem } from './item/CreatePostCardItem';
import { CardItem } from '../../assets/types';
import {
  setCreatePostStep,
  toggleCreatePostOpenable,
} from '../../reducers/steps/createPostPostReducer';
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
      <div className="card">
        <div className="flex-center space-x-2 p-3 md:px-4">
          <ProfilePic />
          <button
            aria-label={thoughts || t('posts.create.layout.thoughts')}
            className="primary-border primary-text md:accent-text md:primary-bg hover:secondary-bg flex-grow overflow-hidden whitespace-nowrap rounded-full border px-4 py-2.5 text-start md:border-none md:px-3 md:py-2"
            onClick={handleToggleOpenable}
            type="button"
          >
            {thoughts || t('posts.create.layout.thoughts')}
          </button>
        </div>
        <div className="primary-border primary-divide primary-transition flex divide-x border-t md:mx-4 md:space-x-1 md:divide-x-0 md:py-2.5">
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
