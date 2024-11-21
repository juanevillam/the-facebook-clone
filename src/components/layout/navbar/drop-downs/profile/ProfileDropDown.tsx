'use client';

import { useState, useRef, useEffect } from 'react';

import classNames from 'classnames';

import {
  ProfileDropDownDefaultStep,
  ProfileDropDownDisplayAccessibilityStep,
  ProfileDropDownSettingsStep,
} from './steps';
import { ProfileDropDownProps, ProfileDropDownStep } from './types';

export const ProfileDropDown = ({
  setOpenProfileDropDown,
  variant = 'dropdown',
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
    settings: <ProfileDropDownSettingsStep setStep={setStep} />,
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
      className={classNames({
        'card only-desktop-block absolute right-5 top-14 overflow-hidden shadow-lg transition-all duration-300 ease-in-out':
          variant === 'dropdown',
        'w-80': variant === 'dropdown' && step === 'default',
        'w-96': variant === 'dropdown' && step !== 'default',
        'w-full': variant === 'page',
      })}
      style={{
        height,
      }}
    >
      <div ref={contentRef}>{steps[step]}</div>
    </div>
  );
};
