import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { SharedSvg } from '@/assets/types';
import { Tooltip } from '@/components';
import { IconButton } from '@/components/buttons';

type NavbarDropDownIconProps = {
  className?: string;
  Icon?: SharedSvg;
  isActive?: boolean;
  label: 'messenger' | 'notifications' | 'profile';
  onClick: VoidFunction;
  children?: React.ReactNode;
};

export const NavbarDropDownIcon = ({
  className,
  Icon,
  isActive,
  label,
  onClick,
  children,
}: NavbarDropDownIconProps) => {
  const t = useTranslations('navbar.drop-downs');

  if (children)
    return (
      <Tooltip label={t(`${label}.tooltip`)} position="-bottom-11">
        <button
          aria-label={t(`${label}.tooltip`)}
          className={classNames('flex-center-justify-center', {
            peer: !isActive,
          })}
          onClick={onClick}
        >
          {children}
        </button>
      </Tooltip>
    );

  if (Icon)
    return (
      <Tooltip label={t(`${label}.tooltip`)} position="-bottom-11">
        <IconButton
          className={classNames(
            `flex-center-justify-center primary-transition size-10 rounded-full p-[10px] ${className}`,
            {
              'bg-primary-500 hover:bg-primary-600 dark:bg-primary-300 dark:hover:bg-primary-400':
                isActive,
              'peer bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600':
                !isActive,
            }
          )}
          icon={{
            ariaLabel: `open-${label}-dropdown`,
            className: classNames({
              'fill-primary-100': isActive,
              'fill-black dark:fill-gray-200': !isActive,
            }),
            Component: Icon,
          }}
          onClick={onClick}
        />
      </Tooltip>
    );
};
