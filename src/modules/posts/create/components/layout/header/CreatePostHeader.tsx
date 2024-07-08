import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { SharedSvg, VoidFunction } from '@/assets/types';
import { IconButton } from '@/components/buttons';
import { IconButtonName } from '@/components/buttons/icon-button/icon-button';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostDefaultStepButton } from '../../steps/default';

interface CreatePostHeaderProps {
  Icon: {
    Component: SharedSvg;
    name: IconButtonName;
    onClick: VoidFunction;
  };
}

export const CreatePostHeader = ({ Icon }: CreatePostHeaderProps) => {
  const t = useTranslations('posts.create.layout.header.steps');
  const { step } = useAppSelector((store) => store.posts.create.post);

  return (
    <div className="border-b flex-center-justify-between p-1.5 md:p-4 primary-border md:justify-center">
      <div className="flex-center space-x-1.5">
        <IconButton
          className={classNames(
            'size-10 md:size-9 md:absolute md:primary-bg hover:secondary-bg',
            {
              'right-4': step === 'default',
              'left-4': step !== 'default',
            }
          )}
          icon={{
            className:
              'primary-stroke md:secondary-stroke size-full stroke-[2.5] md:stroke-2',
            Component: Icon.Component,
            name: Icon.name,
          }}
          onClick={Icon.onClick}
        />
        <h1 className="primary-text text-lg md:text-xl md:font-semibold">
          {t(step)}
        </h1>
      </div>
      {step === 'default' && (
        <div className="md:hidden">
          <CreatePostDefaultStepButton />
        </div>
      )}
    </div>
  );
};
