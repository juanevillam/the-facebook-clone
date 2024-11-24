'use client';

import { useTranslations } from 'next-intl';

import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { useAppSelector } from '@/lib/store/hooks';

import { CreateStoryPageButton } from '../button/CreateStoryPageButton';

export const CreateStoryPageSidebar = () => {
  const t = useTranslations('stories.create.page.sidebar');
  const currentUser = useCurrentUser();
  const { file } = useAppSelector(
    (store) => store.stories.createStory.createStoriesMedia
  );

  return (
    <div className="only-desktop card-bg h-full flex-col justify-between shadow-lg md:min-w-64 lg:min-w-80 xl:min-w-96">
      <div className="primary-border h-max w-full border-b px-5 py-8">
        <h1 className="primary-text mb-6 text-2xl font-semibold">
          {t('title')}
        </h1>
        <div className="flex-center space-x-2.5">
          <ProfilePic variant="large" />
          <h1 className="primary-text truncate text-lg font-semibold leading-snug">
            {currentUser?.name}
          </h1>
        </div>
      </div>
      {file && (
        <div className="primary-border border-t p-3">
          <CreateStoryPageButton />
        </div>
      )}
    </div>
  );
};
