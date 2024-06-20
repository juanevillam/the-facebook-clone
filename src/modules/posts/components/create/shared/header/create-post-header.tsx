import { useTranslations } from 'next-intl';

import { SharedSvgProps } from '@/assets/ui/icons/types';
import { IconButton } from '@/components/buttons';
import { iconButtonName } from '@/components/buttons/icon-button/icon-button';
import { useAppSelector } from '@/lib/store/hooks';

interface CreatePostHeaderProps {
  icon: {
    Component: React.FC<SharedSvgProps>;
    name: iconButtonName;
    onClick: () => void;
  };
}

export const CreatePostHeader = ({ icon }: CreatePostHeaderProps) => {
  const t = useTranslations('posts.create.header');
  const { step } = useAppSelector((store) => store.postsReducer);

  return (
    <div className="border-b border-gray-300 flex items-center p-1.5 relative space-x-1.5 md:justify-center md:p-3.5 dark:border-dark-50">
      <IconButton
        className={`size-10 md:absolute md:bg-smoke-1000 md:hover:bg-smoke-1100 md:size-9 md:dark:bg-dark-200 dark:hover:bg-dark-600 ${step === 'default' ? 'right-4' : 'left-4'}`}
        icon={{
          className:
            'size-full stroke-black stroke-2 md:stroke-gray-500 dark:stroke-smoke-1200',
          Component: icon.Component,
          name: icon.name,
        }}
        onClick={icon.onClick}
      />
      <h2 className="text-lg md:font-bold dark:text-smoke-600">
        {t(`${step}.title`)}
      </h2>
    </div>
  );
};
