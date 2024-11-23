'use client';

import { useTranslations } from 'next-intl';

import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';

export const CreateStoryPageSidebar = () => {
  const currentUser = useCurrentUser();
  const t = useTranslations('stories.create.page.sidebar');

  return (
    <div className="only-desktop card-bg h-full shadow-lg md:min-w-64 lg:min-w-80 xl:min-w-96">
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
    </div>
  );
};
