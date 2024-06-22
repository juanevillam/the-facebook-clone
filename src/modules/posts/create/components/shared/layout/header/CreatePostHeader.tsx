import { useTranslations } from 'next-intl';

import { SharedSvg, VoidFunction } from '@/assets/types';
import { IconButton } from '@/components/buttons';
import { IconButtonName } from '@/components/buttons/icon-button/icon-button';
import { useAppSelector } from '@/lib/store/hooks';

interface CreatePostHeaderProps {
  icon: {
    Component: SharedSvg;
    name: IconButtonName;
    onClick: VoidFunction;
  };
}

export const CreatePostHeader = ({ icon }: CreatePostHeaderProps) => {
  const t = useTranslations('posts.create.header');
  const { step } = useAppSelector((store) => store.posts.create.post);

  return (
    <div className="border-b border-gray-300 flex items-center p-1.5 relative space-x-1.5 dark:border-dark-50 md:justify-center md:p-3.5">
      <IconButton
        className={`size-10 dark:hover:bg-dark-500 md:absolute md:bg-gray-200 md:hover:bg-gray-300 md:size-9 md:dark:bg-dark-200 ${step === 'default' ? 'right-4' : 'left-4'}`}
        icon={{
          className:
            'size-full stroke-black stroke-2 dark:stroke-gray-400 md:stroke-gray-500',
          Component: icon.Component,
          name: icon.name,
        }}
        onClick={icon.onClick}
      />
      <h2 className="text-lg dark:text-gray-100 md:font-bold">
        {t(`${step}.title`)}
      </h2>
    </div>
  );
};
