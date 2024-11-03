import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { SharedSvg } from '@/assets/types';
import { IconButton } from '@/components/buttons';
import { IconButtonName } from '@/components/buttons/icon-button/IconButton';
import { PoweredByGiphyImage } from '@/components/images';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostDefaultStepButton } from '../../steps/default';

type CreatePostHeaderProps = {
  Icon: {
    Component: SharedSvg;
    name: IconButtonName;
    onClick: VoidFunction;
  };
};

export const CreatePostHeader = ({ Icon }: CreatePostHeaderProps) => {
  const t = useTranslations('posts.create.layout.header.steps');
  const { step } = useAppSelector((store) => store.posts.create.post);

  return (
    <div className="primary-border flex-center-justify-between border-b p-1.5 md:justify-center md:p-4">
      <div className="flex-center space-x-1.5">
        <IconButton
          className={classNames(
            'md:primary-bg hover:secondary-bg size-10 md:absolute md:size-9',
            {
              'right-4': step === 'default',
              'left-4': step !== 'default',
            }
          )}
          icon={{
            className:
              'stroke-[2.5] md:stroke-2 primary-stroke md:secondary-stroke size-full',
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
      {step === 'gifs' && (
        <div className="right-4 md:absolute">
          <PoweredByGiphyImage />
        </div>
      )}
    </div>
  );
};
