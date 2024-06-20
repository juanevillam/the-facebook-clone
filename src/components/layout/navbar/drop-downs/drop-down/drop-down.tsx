import { useTranslations } from 'next-intl';

import { sharedSvgType } from '@/assets/types';
import { Tooltip } from '@/components/tooltip/tooltip';

interface DropDownProps {
  className?: string;
  Icon: sharedSvgType;
  isActive?: boolean;
  label: string;
}

export const DropDown = ({
  className,
  Icon,
  isActive,
  label,
}: DropDownProps) => {
  const t = useTranslations('navbar.drop-downs');

  return (
    <Tooltip label={t(label)} position="-bottom-11">
      <button
        className={`cursor-pointer duration-150 flex items-center justify-center p-[10px] rounded-full size-10 transition ${
          isActive
            ? 'bg-primary-500 hover:bg-primary-600 dark:bg-primary-300 dark:hover:bg-primary-400'
            : 'bg-gray-200 hover:bg-gray-300 peer dark:bg-dark-200 dark:hover:bg-dark-500'
        } ${className}`}
        aria-label={label}
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
