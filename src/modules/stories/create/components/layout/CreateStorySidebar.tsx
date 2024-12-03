'use client';

import { useTranslations } from 'next-intl';

import { CloseIcon } from '@/assets/icons';
import { FacebookLogoMark } from '@/assets/icons/brand';
import { ProfilePic } from '@/components';
import { IconButton } from '@/components/buttons';
import { useCurrentUser } from '@/hooks';
import { useAppSelector } from '@/lib/store/hooks';

import { CreateStoryButton } from './CreateStoryButton';

type CreateStorySidebarProps = {
  handleToggleOpenable: VoidFunction;
};

export const CreateStorySidebar = ({
  handleToggleOpenable,
}: CreateStorySidebarProps) => {
  const t = useTranslations('stories.create.layout.sidebar');
  const currentUser = useCurrentUser();
  const { file } = useAppSelector(
    (store) => store.stories.createStory.createStoryMedia
  );

  return (
    <div className="card-bg flex flex-col justify-between shadow-lg md:min-w-64 lg:min-w-80 xl:min-w-96">
      <div>
        <div className="primary-border flex-center w-full space-x-4 border-b px-5 py-4">
          <IconButton
            className="size-10 bg-neutral-900/50 hover:bg-neutral-700/50"
            icon={{
              ariaLabel: 'close-create-story',
              className: 'stroke-2 stroke-white size-full',
              Component: CloseIcon,
            }}
            onClick={handleToggleOpenable}
          />
          <FacebookLogoMark className="hidden size-10 md:block" />
        </div>
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
      {file && (
        <div className="primary-border border-t p-3">
          <CreateStoryButton />
        </div>
      )}
    </div>
  );
};
