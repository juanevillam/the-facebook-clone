import { useCallback } from 'react';

import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
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

  return (
    <div className="border-t w-full dark:border-dark-50 md:border-none md:mb-4 md:pt-1.5 md:px-4">
      <div className="flex items-center justify-between dark:border-dark-50 md:border md:pl-4 md:pr-3 md:py-2 md:rounded-lg">
        <h1 className="font-medium hidden text-sm dark:text-gray-100 md:block md:font-semibold">
          {t('posts.create.footer.title')}
        </h1>
        <div className="w-full md:flex md:space-x-1 md:w-max">
          <CreatePostFooterItem
            active={!!file}
            disabled={!!activeGif}
            image={{
              alt: t('posts.create.actions.photo-video.desktop'),
              src: 'photo-video',
            }}
            onClick={handleOpenMediaStep}
          />
          <CreatePostFooterItem
            active={false}
            image={{
              alt: t('posts.create.actions.tag-people.desktop'),
              src: 'tag-people',
            }}
            onClick={handleOpenTagPeopleStep}
          />
          <CreatePostFooterItem
            active={!!activeFeeling}
            image={{
              alt: t('posts.create.actions.feeling-activity.desktop'),
              src: 'feeling-activity',
            }}
            onClick={handleOpenFeelingsStep}
          />
          <CreatePostFooterItem
            active={!!activeLocation}
            image={{
              alt: t('posts.create.actions.check-in.desktop'),
              src: 'check-in',
            }}
            onClick={handleOpenCheckInStep}
          />
          <CreatePostFooterItem
            active={!!activeGif}
            disabled={!!file}
            image={{
              alt: t('posts.create.actions.gif.desktop'),
              src: 'gif',
            }}
            onClick={handleOpenGifStep}
          />
        </div>
      </div>
    </div>
  );
};
