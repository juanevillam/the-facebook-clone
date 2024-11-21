import { useTranslations } from 'next-intl';

import { SharedSvg } from '@/assets/types';
import { ChevronRightIcon } from '@/assets/ui/icons';

type ProfileDropDownDefaultStepItemProps = {
  dropdown?: boolean;
  Icon: SharedSvg;
  label: 'settings' | 'display-accessibility' | 'log-out';
  onClick: VoidFunction;
};

export const ProfileDropDownDefaultStepItem = ({
  dropdown = false,
  Icon,
  label,
  onClick,
}: ProfileDropDownDefaultStepItemProps) => {
  const t = useTranslations('navbar.drop-downs.profile.steps');

  return (
    <button
      aria-label={t(`${label}.title`)}
      className="hover:primary-bg primary-transition flex-center-justify-between w-full rounded-lg p-2"
      onClick={onClick}
      type="button"
    >
      <div className="flex-center space-x-2">
        <div className="primary-bg primary-transition rounded-full p-2">
          <Icon className="primary-fill size-6" />
        </div>
        <h1 className="primary-text font-semibold">{t(`${label}.title`)}</h1>
      </div>
      {dropdown && (
        <ChevronRightIcon className="secondary-stroke size-6 fill-none stroke-[2]" />
      )}
    </button>
  );
};
