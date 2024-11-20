import React from 'react';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

type ProfileDropDownDisplayAccessibilityStepItemProps = {
  checked: boolean;
  label: 'on' | 'off' | 'automatic';
  name: 'theme' | 'full-screen';
  onChange: () => void;
};

export const ProfileDropDownDisplayAccessibilityStepItem = ({
  checked,
  label,
  name,
  onChange,
}: ProfileDropDownDisplayAccessibilityStepItemProps) => {
  const t = useTranslations(
    `navbar.drop-downs.profile.steps.display-accessibility.options`
  );

  return (
    <label className="hover:primary-bg primary-transition flex-center-justify-between primary-text cursor-pointer rounded-lg p-3 font-medium">
      {t(label)}
      <input
        className="sr-only"
        checked={checked}
        name={name}
        onChange={onChange}
        type="radio"
        value={label}
      />
      <span
        className={classNames(
          'flex-center-justify-center size-6 rounded-full border-2',
          {
            'border-primary-100': checked,
            'border-neutral-500': !checked,
          }
        )}
      >
        {checked && <span className="size-3 rounded-full bg-primary-100" />}
      </span>
    </label>
  );
};
