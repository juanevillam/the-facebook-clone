'use client';

import { useTranslations } from 'next-intl';

import { NoProfilePicImage } from '@/components/images';

import { CreatePostCardAction } from './action/create-post-card-action';

export const CreatePostCard = () => {
  const t = useTranslations('posts.create');

  return (
    <div className="bg-white mb-2 pt-3 md:mb-4 md:pb-2.5 md:rounded-lg dark:bg-dark-100">
      <div className="flex items-center pb-3 px-4 space-x-2">
        <NoProfilePicImage />
        <button
          className="bg-transparent border cursor-pointer duration-150 flex flex-grow hover:bg-smoke-1000 overflow-hidden px-3 py-2 rounded-full transition md:bg-gray-100 md:border-none md:dark:bg-dark-200 md:dark:hover:bg-dark-600 dark:border-dark-50 dark:hover:bg-dark-200"
          onClick={() => {
            console.log('Thoughts');
          }}
          type="button"
        >
          <p className="text-smoke-700 whitespace-nowrap dark:text-smoke-300">
            {t('thoughts-placeholder')}
          </p>
        </button>
      </div>
      <div className="border-t divide-x flex md:divide-x-0 md:space-x-1 md:pt-2 md:mx-4 dark:border-dark-50 dark:divide-dark-50">
        <CreatePostCardAction
          active={false}
          image={{
            alt: t('actions.live-video.desktop'),
            src: 'live-video',
          }}
          label={{
            desktop: t('actions.live-video.desktop'),
            mobile: t('actions.live-video.mobile'),
          }}
          onClick={() => {
            console.log('Live video');
          }}
        />
        <CreatePostCardAction
          active={false}
          image={{
            alt: t('actions.photo-video.desktop'),
            src: 'photo-video',
          }}
          label={{
            desktop: t('actions.photo-video.desktop'),
            mobile: t('actions.photo-video.mobile'),
          }}
          onClick={() => {
            console.log('Photo video');
          }}
        />
        <CreatePostCardAction
          active={false}
          image={{
            alt: t('actions.feeling-activity.desktop'),
            src: 'feeling-activity',
          }}
          label={{
            desktop: t('actions.feeling-activity.desktop'),
            mobile: t('actions.feeling-activity.mobile'),
          }}
          onClick={() => {
            console.log('Feeling activity');
          }}
        />
      </div>
    </div>
  );
};
