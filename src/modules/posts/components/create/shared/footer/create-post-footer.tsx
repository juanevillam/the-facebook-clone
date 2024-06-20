import { useTranslations } from 'next-intl';

import { CreatePostFooterAction } from './action/create-post-footer-action';

export const CreatePostFooter = () => {
  const t = useTranslations('posts.create');

  return (
    <div className="border-t w-full md:border-none md:mb-4 md:pt-1.5 md:px-4 dark:border-dark-500">
      <div className="flex items-center justify-between pl-4 pr-3 py-2 md:border md:rounded-lg dark:border-dark-500">
        <h1 className="font-medium text-sm md:font-semibold dark:text-smoke-600">
          {t('footer.title')}
        </h1>
        <div className="flex space-x-1">
          <CreatePostFooterAction
            active={false}
            image={{
              alt: t('actions.photo-video.desktop'),
              src: 'photo-video',
            }}
            onClick={() => {
              console.log('Photo video');
            }}
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
            active={false}
            image={{
              alt: t('actions.feeling-activity.desktop'),
              src: 'feeling-activity',
            }}
            onClick={() => {
              console.log('Feeling/activity');
            }}
          />
          <CreatePostFooterAction
            active={false}
            image={{
              alt: t('actions.check-in.desktop'),
              src: 'check-in',
            }}
            onClick={() => {
              console.log('Check in');
            }}
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
