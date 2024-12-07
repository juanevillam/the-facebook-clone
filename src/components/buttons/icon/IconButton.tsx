import { forwardRef } from 'react';

import { useTranslations } from 'next-intl';

import { IconButtonProps } from './types';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, onClick }, ref) => {
    const t = useTranslations('icon-buttons');

    return (
      <button
        aria-label={t(icon.ariaLabel)}
        className={`flex-center rounded-full p-2 transition-all duration-150 hover:scale-105 hover:bg-opacity-80 focus:scale-95 ${className}`}
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
