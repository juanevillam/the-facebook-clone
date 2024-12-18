import { useTranslations } from 'next-intl';

import { ChevronRightIcon } from '@/assets/icons';
import { SharedSvg } from '@/assets/types';

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
      className="card hover:bg-primary flex-between group w-full rounded-lg p-2 transition-colors"
      onClick={onClick}
      type="button"
    >
      <div className="flex-align-center space-x-2">
        <div className="bg-primary rounded-full p-2 transition-colors">
          <Icon className="fill-primary size-6" />
        </div>
        <h1 className="text-primary font-semibold">{t(`${label}.title`)}</h1>
      </div>
      {dropdown && (
        <ChevronRightIcon className="secondary-stroke size-6 fill-none stroke-[2] transition-transform group-hover:translate-x-[2px]" />
      )}
    </button>
  );
};
