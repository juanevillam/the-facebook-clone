import { useTranslations } from 'next-intl';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setStep } from '@/lib/store/reducers/posts-reducer';

import { CreatePostFooterAction } from './action/create-post-footer-action';

export const CreatePostFooter = () => {
  const t = useTranslations('posts.create');
  const dispatch = useAppDispatch();
  const { checkIn, feelings, media } = useAppSelector(
    (store) => store.postsReducer
  );

  const openMediaStep = () => dispatch(setStep('media'));

  const openFeelingsStep = () => dispatch(setStep('feelings'));

  const openCheckInStep = () => dispatch(setStep('check-in'));

  return (
    <div className="border-t w-full md:border-none md:mb-4 md:pt-1.5 md:px-4 dark:border-dark-50">
      <div className="flex items-center justify-between pl-4 pr-3 py-2 md:border md:rounded-lg dark:border-dark-50">
        <h1 className="font-medium text-sm md:font-semibold dark:text-gray-100">
          {t('footer.title')}
        </h1>
        <div className="flex space-x-1">
          <CreatePostFooterAction
            active={media.file ? true : false}
            image={{
              alt: t('actions.photo-video.desktop'),
              src: 'photo-video',
            }}
            onClick={openMediaStep}
          />
          <CreatePostFooterAction
            active={false}
            image={{
              alt: t('actions.tag-people.desktop'),
              src: 'tag-people',
            }}
            onClick={() => {
              console.log('Tag people');
            }}
          />
          <CreatePostFooterAction
            active={feelings.activeFeeling ? true : false}
            image={{
              alt: t('actions.feeling-activity.desktop'),
              src: 'feeling-activity',
            }}
            onClick={openFeelingsStep}
          />
          <CreatePostFooterAction
            active={checkIn.activeLocation ? true : false}
            image={{
              alt: t('actions.check-in.desktop'),
              src: 'check-in',
            }}
            onClick={openCheckInStep}
          />
          <CreatePostFooterAction
            active={false}
            image={{
              alt: t('actions.gif.desktop'),
              src: 'gif',
            }}
            onClick={() => {
              console.log('GIF');
            }}
          />
        </div>
      </div>
    </div>
  );
};
