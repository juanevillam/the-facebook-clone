'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { ArrowLeftIcon, ArrowsPointingOutIcon, MoonIcon } from '@/assets/icons';
import { SetValue } from '@/assets/types';
import { useFullScreen } from '@/hooks';

import { ProfileDropDownRadioInput } from './ProfileDropDownRadioInput';
import { DropDownHeaderIcon } from '../../icons';
import { ProfileDropDownStep } from '../types';

type ProfileDropDownDisplayAccessibilityStepProps = {
  setStep: SetValue<ProfileDropDownStep>;
};

export const ProfileDropDownDisplayAccessibilityStep = ({
  setStep,
}: ProfileDropDownDisplayAccessibilityStepProps) => {
  const t = useTranslations(
    'navbar.drop-downs.profile.steps.display-accessibility'
  );

  const { setTheme, theme } = useTheme();
  const { isFullScreen, toggleFullScreen } = useFullScreen();

  const handleClose = () => setStep('default');

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => () =>
    setTheme(newTheme);

  return (
    <div className="p-2.5 md:px-4 md:py-3">
      <div className="card-bg primary-transition rounded-lg py-3 pl-2 pr-4 md:p-0">
        <div className="flex-center mb-4 w-full space-x-2">
          <div>
            <DropDownHeaderIcon
              leftPosition="-left-4"
              icon={{
                className: 'stroke-2 secondary-stroke size-full',
                Component: ArrowLeftIcon,
                name: 'back',
              }}
              onClick={handleClose}
              tooltilp={false}
            />
          </div>
          <h1 className="primary-text truncate text-2xl font-bold">
            {t('title')}
          </h1>
        </div>
        <div className="mb-2 flex space-x-2">
          <div className="primary-bg primary-transition h-max rounded-full p-2">
            <MoonIcon className="primary-fill size-6" />
          </div>
          <div>
            <h1 className="primary-text text-lg font-semibold">
              {t('dark-mode.title')}
            </h1>
            <p className="secondary-text text-sm">
              {t('dark-mode.description')}
            </p>
          </div>
        </div>
        <div className="mb-4 ml-10">
          <ProfileDropDownRadioInput
            checked={theme === 'light'}
            label="off"
            name="theme"
            onChange={handleThemeChange('light')}
          />
          <ProfileDropDownRadioInput
            checked={theme === 'dark'}
            label="on"
            name="theme"
            onChange={handleThemeChange('dark')}
          />
          <ProfileDropDownRadioInput
            checked={theme === 'system'}
            label="automatic"
            name="theme"
            onChange={handleThemeChange('system')}
          />
        </div>
        <div className="mb-2 flex space-x-2">
          <div className="primary-bg primary-transition h-max rounded-full p-2">
            <ArrowsPointingOutIcon className="primary-fill primary-stroke size-6" />
          </div>
          <div>
            <h1 className="primary-text text-lg font-semibold">
              {t('full-screen.title')}
            </h1>
            <p className="secondary-text pr-4 text-sm">
              {t('full-screen.description')}
            </p>
          </div>
        </div>
        <div className="mb-4 ml-10">
          <ProfileDropDownRadioInput
            checked={!isFullScreen}
            label="off"
            name="full-screen"
            onChange={toggleFullScreen}
          />
          <ProfileDropDownRadioInput
            checked={isFullScreen}
            label="on"
            name="full-screen"
            onChange={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};
