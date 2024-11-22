import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { IS_PRODUCTION } from '@/constants/environment';
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

  const handleOpenMediaStep = () => dispatch(setStep('media'));

  const handleOpenFeelingsStep = () => dispatch(setStep('feelings'));

  const handleOpenCheckInStep = () => dispatch(setStep('check-in'));

  const handleOpenGifsStep = () => dispatch(setStep('gifs'));

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
      active: !!activeLocation,
      name: 'check-in',
      onClick: handleOpenCheckInStep,
    },
    {
      active: !!activeGif,
      disabled: !!file || IS_PRODUCTION,
      name: 'gif',
      onClick: handleOpenGifsStep,
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
