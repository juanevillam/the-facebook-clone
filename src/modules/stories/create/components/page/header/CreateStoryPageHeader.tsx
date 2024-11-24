'use client';

import { useTranslations } from 'next-intl';

import { ArrowLeftIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from '@/navigation';

import { CreateStoryPageButton } from '../button/CreateStoryPageButton';

export const CreateStoryPageHeader = () => {
  const t = useTranslations('stories.create.page.header');
  const { file } = useAppSelector(
    (store) => store.stories.createStory.createStoriesMedia
  );

  const router = useRouter();

  const navigateToHome = () => router.push('/');

  return (
    <div className="only-mobile flex-center-justify-between primary-border border-b p-1.5">
      <div className="flex-center space-x-1.5">
        <IconButton
          className="hover:primary-bg size-10"
          icon={{
            className: 'stroke-[2.5] primary-stroke size-full',
            Component: ArrowLeftIcon,
            name: 'back',
          }}
          onClick={navigateToHome}
        />
        <h1 className="primary-text text-lg md:font-semibold">{t('title')}</h1>
      </div>
      {file && (
        <div>
          <CreateStoryPageButton />
        </div>
      )}
    </div>
  );
};
