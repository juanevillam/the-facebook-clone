'use client';

import { useTranslations } from 'next-intl';

import { ArrowLeftIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { useAppSelector } from '@/lib/store/hooks';

import { CreateStoryButton } from '../button/CreateStoryButton';

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
    <div className="flex-center-justify-between primary-border border-b p-1.5">
      <div className="flex-center space-x-1.5">
        <IconButton
          className="hover:primary-bg size-10"
          icon={{
            className: 'stroke-[2.5] primary-stroke size-full',
            Component: ArrowLeftIcon,
            name: 'back',
          }}
          onClick={handleToggleOpenable}
        />
        <h1 className="primary-text text-lg md:font-semibold">{t('title')}</h1>
      </div>
      {file && (
        <div>
          <CreateStoryButton />
        </div>
      )}
    </div>
  );
};
