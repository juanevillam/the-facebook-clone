import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { SharedSvg } from '@/assets/types';
import { IconButton } from '@/components/buttons';
import { IconButtonName } from '@/components/buttons/icon-button/IconButton';
import { Tooltip } from '@/components/tooltip/Tooltip';

type DropDownHeaderIconProps = {
  icon: {
    className: string;
    Component: SharedSvg;
    name: IconButtonName;
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
      label={t(icon.name)}
      position={`-bottom-9 ${leftPosition}`}
      variant="small"
    >
      <IconButton
        className={classNames('hover:primary-bg -mt-1 size-9', {
          peer: tooltilp,
        })}
        icon={{
          className: icon.className,
          Component: icon.Component,
          name: icon.name,
        }}
        onClick={onClick}
      />
    </Tooltip>
  );
};
