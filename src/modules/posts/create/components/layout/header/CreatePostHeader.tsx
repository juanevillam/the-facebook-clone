import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { SharedSvg, VoidFunction } from '@/assets/types';
import { IconButton } from '@/components/buttons';
import { IconButtonName } from '@/components/buttons/icon-button/icon-button';
import { useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_LAYOUT_HEADER_PATH } from '@/modules/posts/create/assets/translations';

import { CreatePostDefaultStepButton } from '../../steps/default';

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
    <div className="flex-justify-between-center border-b main-border p-1.5 md:p-4 md:justify-center">
      <div className="flex-center space-x-1.5">
        <IconButton
          className={classNames(
            'size-10 md:size-9 md:absolute md:main-bg hover:main-bg-hover',
            {
              'right-4': step === 'default',
              'left-4': step !== 'default',
            }
          )}
          icon={{
            className:
              'stroke-[2.5] md:stroke-2 main-stroke md:secondary-stroke size-full',
            Component: icon.Component,
            name: icon.name,
          }}
          onClick={icon.onClick}
        />
        <h2 className="main-text text-lg md:text-xl md:font-semibold">
          {t(step)}
        </h2>
      </div>
      {step === 'default' && (
        <div className="md:hidden">
          <CreatePostDefaultStepButton />
        </div>
      )}
    </div>
  );
};
