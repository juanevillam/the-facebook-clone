import { useCallback } from 'react';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { CardItem } from '@/modules/posts/create/assets/types';
import { setStep } from '@/modules/posts/create/reducers/postSlice';

import { CreatePostFooterItem } from './item/CreatePostFooterItem';

export const CreatePostFooter = () => {
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

  const handleOpenTagPeopleStep = useCallback(() => {
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

  const cardItems: CardItem[] = [
    {
      active: !!file,
      disabled: !!activeGif,
      name: 'photo-video',
      onClick: handleOpenMediaStep,
    },
    {
      active: false,
      name: 'tag-people',
      onClick: handleOpenTagPeopleStep,
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
  ];

  return (
    <div className="border-t w-full dark:border-dark-50 md:border-none md:p-4 md:pt-1.5">
      <div className="flex items-center justify-between dark:border-dark-50 md:border md:pl-4 md:pr-3 md:py-2 md:rounded-lg">
        <h1 className="hidden md:block md:font-semibold md:text-sm md:dark:text-gray-100">
          {t('posts.create.layout.footer.title')}
        </h1>
        <div
          className={classNames('w-full md:flex md:space-x-1 md:w-max', {
            flex: activeGif,
          })}
        >
          {cardItems.map((item) => (
            <CreatePostFooterItem key={item.name} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
