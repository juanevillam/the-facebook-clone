import { useState } from 'react';

import classNames from 'classnames';

import {
  ProfileDropDownDefaultStep,
  ProfileDropDownDisplayAccessibilityStep,
} from './steps';
import { ProfileDropDownProps, ProfileDropDownStep } from './types';

export const ProfileDropDown = ({
  setOpenProfileDropDown,
}: ProfileDropDownProps) => {
  const [step, setStep] = useState<ProfileDropDownStep>('default');

  const steps = {
    default: (
      <ProfileDropDownDefaultStep
        setOpenProfileDropDown={setOpenProfileDropDown}
        setStep={setStep}
      />
    ),
    'display-accessibility': (
      <ProfileDropDownDisplayAccessibilityStep setStep={setStep} />
    ),
  };

  return (
    <div
      className={classNames(
        'card only-desktop-block absolute right-5 top-14 shadow-lg',
        {
          'w-80 p-2': step === 'default',
          'w-96 px-4 py-3': step !== 'default',
        }
      )}
    >
      {steps[step]}
    </div>
  );
};
