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
};

export const DropDownHeaderIcon = ({
  icon,
  leftPosition,
  onClick,
}: DropDownHeaderIconProps) => {
  const t = useTranslations('icon-buttons');

  return (
    <Tooltip
      label={t(icon.name)}
      position={`-bottom-9 ${leftPosition}`}
      variant="small"
    >
      <IconButton
        className="hover:primary-bg peer -mt-1 size-9"
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
