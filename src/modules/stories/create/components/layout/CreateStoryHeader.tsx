'use client';

import { useTranslations } from 'next-intl';

import { ArrowLeftIcon } from '@/assets/icons';
import { IconButton } from '@/components/buttons';
import { useAppSelector } from '@/lib/store/hooks';

import { CreateStoryButton } from './CreateStoryButton';

type CreateStoryHeaderProps = {
  handleToggleOpenable: VoidFunction;
};

export const CreateStoryHeader = ({
  handleToggleOpenable,
}: CreateStoryHeaderProps) => {
  const t = useTranslations('stories.create.layout.header');
  const { file } = useAppSelector(
    (store) => store.stories.createStory.createStoryMedia
  );

  return (
    <div className="flex-between border-primary border-b p-1.5">
      <div className="flex-align-center space-x-1.5">
        <IconButton
          className="hover:bg-primary size-10"
          icon={{
            ariaLabel: 'close-create-story',
            className: 'stroke-[2.5] primary-stroke size-full',
            Component: ArrowLeftIcon,
          }}
          onClick={handleToggleOpenable}
        />
        <h1
          className="text-primary text-lg transition-colors duration-300 md:font-semibold"
          id="create-story-modal-title"
        >
          {t('title')}
        </h1>
      </div>
      {file && (
        <div>
          <CreateStoryButton />
        </div>
      )}
    </div>
  );
};
