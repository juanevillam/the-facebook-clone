import React from 'react';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { Theme } from '@/hooks/useTheme';

type ProfileDropDownDisplayAccessibilityStepItemProps = {
  changeTheme: (theme: Theme) => void;
  label: 'on' | 'off' | 'automatic';
  theme: Theme;
  value: Theme;
};

export const ProfileDropDownDisplayAccessibilityStepItem = ({
  changeTheme,
  label,
  theme,
  value,
}: ProfileDropDownDisplayAccessibilityStepItemProps) => {
  const t = useTranslations(
    'navbar.drop-downs.profile.steps.display-accessibility.dark-mode'
  );

  const onChange = () => changeTheme(value);

  return (
    <label className="hover:primary-bg primary-transition flex-center-justify-between primary-text cursor-pointer rounded-lg p-3 font-medium">
      {t(label)}
      <input
        className="sr-only"
        checked={theme === value}
        name="theme"
        onChange={onChange}
        type="radio"
        value={value}
      />
      <span
        className={classNames(
          'flex-center-justify-center size-6 rounded-full border-2',
          {
            'border-primary-100': theme === value,
            'border-neutral-500': theme !== value,
          }
        )}
      >
        {theme === value && (
          <span className="size-3 rounded-full bg-primary-100" />
        )}
      </span>
    </label>
  );
};
