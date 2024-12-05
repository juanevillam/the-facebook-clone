import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { IS_PRODUCTION } from '@/constants/environment';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setCreatePostStep } from '@/modules/posts/create/reducers/createPostPostReducer';
import { CardItem } from '@/modules/posts/create/types';

import { CreatePostDefaultStepFooterItem } from './CreatePostDefaultStepFooterItem';

export const CreatePostDefaultStepFooter = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { file } = useAppSelector(
    (store) => store.posts.createPost.createPostMediaStep
  );

  const { activeGif } = useAppSelector(
    (store) => store.posts.createPost.createPostGifsStep
  );

  const { activeFeeling } = useAppSelector(
    (store) => store.posts.createPost.createPostFeelingsStep
  );

  const { activeLocation } = useAppSelector(
    (store) => store.posts.createPost.createPostCheckInStep
  );

  const handleOpenMediaStep = () => dispatch(setCreatePostStep('media'));

  const handleOpenFeelingsStep = () => dispatch(setCreatePostStep('feelings'));

  const handleOpenCheckInStep = () => dispatch(setCreatePostStep('check-in'));

  const handleOpenGifsStep = () => dispatch(setCreatePostStep('gifs'));

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
        'flex-between border-primary md:rounded-lg md:border md:p-3',
        {
          'border-t': activeGif,
        }
      )}
    >
      <h1 className="responsive-desktop-only text-primary text-sm font-semibold">
        {t('posts.create.steps.default.footer')}
      </h1>
      <div
        className={classNames('w-full md:flex md:w-max md:space-x-1', {
          'divide-primary flex divide-x md:divide-none': activeGif,
        })}
      >
        {cardItems.map((item) => (
          <CreatePostDefaultStepFooterItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};
