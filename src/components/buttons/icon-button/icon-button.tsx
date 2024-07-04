import React from 'react';

import { useTranslations } from 'next-intl';

import { SharedSvg, VoidFunction } from '@/assets/types';

export type IconButtonName = 'back' | 'close' | 'dots-horizontal';

interface IconButtonProps {
  className: string;
  icon: {
    className: string;
    Component: SharedSvg;
    name: IconButtonName;
  };
  onClick: VoidFunction;
}

export const IconButton = ({ className, icon, onClick }: IconButtonProps) => {
  const t = useTranslations('icon-buttons');

  return (
    <button
      aria-label={t(icon.name)}
      className={`flex-justify-center-center main-transition p-2 rounded-full ${className}`}
      onClick={onClick}
      type="button"
    >
      <icon.Component className={icon.className} />
    </button>
  );
};
