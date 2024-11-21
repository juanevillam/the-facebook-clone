'use client';

import { useState, useRef, useEffect } from 'react';

import classNames from 'classnames';

import {
  ProfileDropDownDefaultStep,
  ProfileDropDownDisplayAccessibilityStep,
} from './steps';
import { ProfileDropDownProps, ProfileDropDownStep } from './types';

export const ProfileDropDown = ({
  setOpenProfileDropDown,
}: ProfileDropDownProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<ProfileDropDownStep>('default');
  const [height, setHeight] = useState('auto');

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

  useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight } = contentRef.current;

      setHeight(`${scrollHeight}px`);
    }
  }, [step]);

  return (
    <div
      className={classNames(
        'card only-desktop-block absolute right-5 top-14 overflow-hidden shadow-lg transition-all duration-300 ease-in-out',
        {
          'w-80': step === 'default',
          'w-96': step !== 'default',
        }
      )}
      style={{
        height,
      }}
    >
      <div ref={contentRef}>{steps[step]}</div>
    </div>
  );
};
