import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { SharedSvg } from '@/assets/types';
import { IconButton } from '@/components/buttons';
import { IconButtonAriaLabel } from '@/components/buttons/icon/types';
import { Tooltip } from '@/components/Tooltip';

type DropDownHeaderIconProps = {
  icon: {
    ariaLabel: IconButtonAriaLabel;
    className: string;
    Component: SharedSvg;
  };
  leftPosition: string;
  onClick?: VoidFunction;
  tooltilp?: boolean;
};

export const DropDownHeaderIcon = ({
  icon,
  leftPosition,
  onClick,
  tooltilp = true,
}: DropDownHeaderIconProps) => {
  const t = useTranslations('icon-buttons');

  return (
    <Tooltip
      label={t(icon.ariaLabel)}
      position={`-bottom-9 ${leftPosition}`}
      variant="small"
    >
      <IconButton
        className={classNames('hover:bg-primary size-9', {
          peer: tooltilp,
        })}
        icon={{
          ariaLabel: icon.ariaLabel,
          className: icon.className,
          Component: icon.Component,
        }}
        onClick={onClick}
      />
    </Tooltip>
  );
};
