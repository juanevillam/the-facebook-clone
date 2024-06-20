import React from 'react';

import { useTranslations } from 'next-intl';

import { SharedSvgProps } from '@/assets/ui/icons/types';

export type iconButtonName = 'close' | 'back';

interface IconButtonProps {
  className: string;
  icon: {
    className: string;
    Component: React.FC<SharedSvgProps>;
    name: iconButtonName;
  };
  onClick: () => void;
}

export const IconButton = ({ className, icon, onClick }: IconButtonProps) => {
  const t = useTranslations('icon-buttons');

  return (
    <button
      aria-label={t(icon.name)}
      className={`duration-150 flex hover:bg-gray-200 items-center justify-center p-2 rounded-full transition md:p-1.5 ${className}`}
      onClick={onClick}
      type="button"
    >
      <icon.Component className={icon.className} />
    </button>
  );
};
