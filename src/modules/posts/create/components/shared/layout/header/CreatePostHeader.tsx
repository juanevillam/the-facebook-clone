import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { SharedSvg, VoidFunction } from '@/assets/types';
import { IconButton } from '@/components/buttons';
import { IconButtonName } from '@/components/buttons/icon-button/icon-button';
import { useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_LAYOUT_HEADER_PATH } from '@/modules/posts/create/assets/translations';

import { CreatePostButton } from '../button/CreatePostButton';

interface CreatePostHeaderProps {
  icon: {
    Component: SharedSvg;
    name: IconButtonName;
    onClick: VoidFunction;
  };
}

export const CreatePostHeader = ({ icon }: CreatePostHeaderProps) => {
  const t = useTranslations(`${POSTS_CREATE_LAYOUT_HEADER_PATH}.steps`);
  const { step } = useAppSelector((store) => store.posts.create.post);

  return (
    <div className="border-b border-gray-300 flex items-center justify-between p-1.5 dark:border-dark-50 md:justify-center md:p-3.5">
      <div className="flex items-center space-x-1.5">
        <IconButton
          className={classNames(
            'size-10 dark:hover:bg-dark-500 md:absolute md:bg-gray-200 md:hover:bg-gray-300 md:size-9 md:dark:bg-dark-200',
            {
              'right-4': step === 'default',
              'left-4': step !== 'default',
            }
          )}
          icon={{
            className:
              'size-full stroke-black stroke-[3] dark:stroke-white md:stroke-gray-500 md:stroke-2',
            Component: icon.Component,
            name: icon.name,
          }}
          onClick={icon.onClick}
        />
        <h2 className="text-lg dark:text-gray-100 md:font-bold">{t(step)}</h2>
      </div>
      {step === 'default' && (
        <div className="md:hidden">
          <CreatePostButton />
        </div>
      )}
    </div>
  );
};
