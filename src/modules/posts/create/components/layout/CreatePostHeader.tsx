import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { SharedSvg } from '@/assets/types';
import { IconButton } from '@/components/buttons';
import { IconButtonAriaLabel } from '@/components/buttons/icon/types';
import { useAppSelector } from '@/lib/store/hooks';

import { CreatePostDefaultStepButton } from '../steps/default';

type CreatePostHeaderProps = {
  icon: {
    ariaLabel: IconButtonAriaLabel;
    Component: SharedSvg;
    onClick: VoidFunction;
  };
};

export const CreatePostHeader = ({ icon }: CreatePostHeaderProps) => {
  const t = useTranslations('posts.create.layout.header.steps');
  const { step } = useAppSelector(
    (store) => store.posts.createPost.createPostPost
  );

  return (
    <header className="flex-center-justify-between primary-border border-b p-1.5 md:justify-center md:p-4">
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
            ariaLabel: icon.ariaLabel,
            className:
              'stroke-[2.5] md:stroke-2 primary-stroke md:secondary-stroke size-full',
            Component: icon.Component,
          }}
          onClick={icon.onClick}
        />
        <h1
          className="primary-text text-lg md:text-xl md:font-semibold"
          id="create-post-title"
        >
          {t(step)}
        </h1>
      </div>
      {step === 'default' && (
        <div className="md:hidden">
          <CreatePostDefaultStepButton />
        </div>
      )}
    </header>
  );
};
