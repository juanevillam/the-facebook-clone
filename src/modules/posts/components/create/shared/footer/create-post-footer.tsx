import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setStep } from '@/lib/store/reducers/posts-reducer';

import { CreatePostFooterAction } from './action/create-post-footer-action';

export const CreatePostFooter = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { checkIn, feelings, media } = useAppSelector(
    (store) => store.postsReducer
  );

  const openMediaStep = () => dispatch(setStep('media'));

  const openTagPeopleStep = () =>
    showToast.error(t('toast-messages.error.feature-under-development'));

  const openFeelingsStep = () => dispatch(setStep('feelings'));

  const openCheckInStep = () => dispatch(setStep('check-in'));

  const openGifStep = () =>
    showToast.error(t('toast-messages.error.feature-under-development'));

  return (
    <div className="border-t w-full md:border-none md:mb-4 md:pt-1.5 md:px-4 dark:border-dark-50">
      <div className="flex items-center justify-between md:border md:pl-4 md:pr-3 md:py-2 md:rounded-lg dark:border-dark-50">
        <h1 className="font-medium hidden text-sm md:block md:font-semibold dark:text-gray-100">
          {t('posts.create.footer.title')}
        </h1>
        <div className="w-full md:flex md:space-x-1 md:w-max">
          <CreatePostFooterAction
            active={media.file ? true : false}
            image={{
              alt: t('posts.create.actions.photo-video.desktop'),
              src: 'photo-video',
            }}
            onClick={openMediaStep}
          />
          <CreatePostFooterAction
            active={false}
            image={{
              alt: t('posts.create.actions.tag-people.desktop'),
              src: 'tag-people',
            }}
            onClick={openTagPeopleStep}
          />
          <CreatePostFooterAction
            active={feelings.activeFeeling ? true : false}
            image={{
              alt: t('posts.create.actions.feeling-activity.desktop'),
              src: 'feeling-activity',
            }}
            onClick={openFeelingsStep}
          />
          <CreatePostFooterAction
            active={checkIn.activeLocation ? true : false}
            image={{
              alt: t('posts.create.actions.check-in.desktop'),
              src: 'check-in',
            }}
            onClick={openCheckInStep}
          />
          <CreatePostFooterAction
            active={false}
            image={{
              alt: t('posts.create.actions.gif.desktop'),
              src: 'gif',
            }}
            onClick={openGifStep}
          />
        </div>
      </div>
    </div>
  );
};
