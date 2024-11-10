import { useTranslations } from 'next-intl';

import { SharedSvg } from '@/assets/types';
import { Tooltip } from '@/components';

type NavbarDropDownIconProps = {
  className?: string;
  Icon: SharedSvg;
  isActive?: boolean;
  label: string;
  onClick?: VoidFunction;
};

export const NavbarDropDownIcon = ({
  className,
  Icon,
  isActive,
  label,
  onClick,
}: NavbarDropDownIconProps) => {
  const t = useTranslations('navbar.drop-downs');

  return (
    <Tooltip label={t(`${label}.tooltip`)} position="-bottom-11">
      <button
        aria-label={t(`${label}.tooltip`)}
        className={`flex-center-justify-center primary-transition size-10 rounded-full p-[10px] ${
          isActive
            ? 'bg-primary-500 hover:bg-primary-600 dark:bg-primary-300 dark:hover:bg-primary-400'
            : 'peer bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600'
        } ${className}`}
        onClick={onClick}
      >
        <Icon
          className={`${
            isActive ? 'fill-primary-100' : 'fill-black dark:fill-gray-200'
          }`}
        />
      </button>
    </Tooltip>
  );
};
