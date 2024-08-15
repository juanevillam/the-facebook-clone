import { forwardRef } from 'react';

import { useTranslations } from 'next-intl';

import { SharedSvg } from '@/assets/types';

export type IconButtonName = 'back' | 'close' | 'dots-horizontal';

type IconButtonProps = {
  className: string;
  icon: {
    className: string;
    Component: SharedSvg;
    name: IconButtonName;
  };
  onClick?: VoidFunction;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, onClick }, ref) => {
    const t = useTranslations('icon-buttons');

    return (
      <button
        aria-label={t(icon.name)}
        className={`flex-center-justify-center primary-transition p-2 rounded-full ${className}`}
        onClick={onClick}
        ref={ref}
        type="button"
      >
        <icon.Component className={icon.className} />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton };
