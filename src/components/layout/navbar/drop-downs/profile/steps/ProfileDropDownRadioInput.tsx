import React from 'react';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

type ProfileDropDownRadioInputProps = {
  checked: boolean;
  label: 'on' | 'off' | 'automatic' | 'english' | 'spanish';
  name: 'theme' | 'full-screen' | 'language';
  onChange: () => void;
};

export const ProfileDropDownRadioInput = ({
  checked,
  label,
  name,
  onChange,
}: ProfileDropDownRadioInputProps) => {
  const t = useTranslations('navbar.drop-downs.profile.steps.options');

  return (
    <label className="hover:primary-bg flex-center-justify-between primary-text cursor-pointer rounded-lg p-3 font-medium">
      {t(label)}
      <input
        aria-describedby={`${name}-option-description`}
        className="sr-only"
        checked={checked}
        name={name}
        onChange={onChange}
        type="radio"
        value={label}
      />
      <span
        aria-checked={checked}
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
      <span className="sr-only" id={`${name}-option-description`}>
        {t('this-option-sets-to', {
          name,
          label,
        })}
      </span>
    </label>
  );
};
