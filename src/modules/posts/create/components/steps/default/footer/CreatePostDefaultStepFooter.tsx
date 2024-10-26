import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
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

  const isProduction = process.env.NODE_ENV === 'production';

  const handleOpenMediaStep = () => dispatch(setStep('media'));

  const handleOpenLiveStep = () =>
    showToast.error(t('toast-messages.error.feature-under-development'));

  const handleOpenFeelingsStep = () => dispatch(setStep('feelings'));

  const handleOpenCheckInStep = () => dispatch(setStep('check-in'));

  const handleOpenGifStep = () => dispatch(setStep('gifs'));

  const handleOpenTagPeopleStep = () =>
    showToast.error(t('toast-messages.error.feature-under-development'));

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
      disabled: !!file || isProduction,
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
        'flex-center-justify-between primary-border md:rounded-lg md:border md:p-3',
        {
          'border-t': activeGif,
        }
      )}
    >
      <h1 className="only-desktop primary-text text-sm font-semibold">
        {t('posts.create.steps.default.footer')}
      </h1>
      <div
        className={classNames('w-full md:flex md:w-max md:space-x-1', {
          'primary-divide flex divide-x md:divide-none': activeGif,
        })}
      >
        {cardItems.map((item) => (
          <CreatePostDefaultStepFooterItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};
