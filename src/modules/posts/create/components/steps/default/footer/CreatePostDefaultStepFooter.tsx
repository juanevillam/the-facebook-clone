import { useCallback } from 'react';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_STEPS_DEFAULT_PATH } from '@/modules/posts/create/assets/translations';
import { CardItem } from '@/modules/posts/create/assets/types';
import { setStep } from '@/modules/posts/create/reducers/postSlice';

import { CreatePostDefaultStepFooterItem } from './item/CreatePostDefaultStepFooterItem';

export const CreatePostDefaultStepFooter = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { file } = useAppSelector((store) => store.posts.create.media);
  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);
  const { activeFeeling } = useAppSelector(
    (store) => store.posts.create.feelings
  );

  const { activeLocation } = useAppSelector(
    (store) => store.posts.create.checkIn
  );

  const handleOpenMediaStep = useCallback(
    () => dispatch(setStep('media')),
    [dispatch]
  );

  const handleOpenLiveStep = useCallback(() => {
    showToast.error(t('toast-messages.error.feature-under-development'));
  }, [t]);

  const handleOpenFeelingsStep = useCallback(
    () => dispatch(setStep('feelings')),
    [dispatch]
  );

  const handleOpenCheckInStep = useCallback(
    () => dispatch(setStep('check-in')),
    [dispatch]
  );

  const handleOpenGifStep = useCallback(
    () => dispatch(setStep('gifs')),
    [dispatch]
  );

  const handleOpenTagPeopleStep = useCallback(() => {
    showToast.error(t('toast-messages.error.feature-under-development'));
  }, [t]);

  const cardItems: CardItem[] = [
    {
      active: false,
      name: 'live-video',
      onClick: handleOpenLiveStep,
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
    {
      active: !!activeLocation,
      name: 'check-in',
      onClick: handleOpenCheckInStep,
    },
    {
      active: !!activeGif,
      disabled: !!file,
      name: 'gif',
      onClick: handleOpenGifStep,
    },
    {
      active: false,
      name: 'tag-people',
      onClick: handleOpenTagPeopleStep,
    },
  ];

  return (
    <div
      className={classNames(
        'flex-center-justify-between main-border md:border md:p-3 md:pl-4 md:rounded-lg',
        {
          'border-t': activeGif,
        }
      )}
    >
      <h1 className="only-desktop main-text font-semibold text-sm">
        {t(`${POSTS_CREATE_STEPS_DEFAULT_PATH}.footer`)}
      </h1>
      <div
        className={classNames('w-full md:w-max md:flex md:space-x-1', {
          'flex divide-x main-divide md:divide-none': activeGif,
        })}
      >
        {cardItems.map((item) => (
          <CreatePostDefaultStepFooterItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};
