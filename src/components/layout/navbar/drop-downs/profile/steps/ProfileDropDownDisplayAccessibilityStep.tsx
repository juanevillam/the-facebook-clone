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
      <div className="bg-card rounded-lg py-3 pl-2 pr-4 md:p-0">
        <div className="flex-align-center mb-4 space-x-2">
          <div>
            <DropDownHeaderIcon
              leftPosition="-left-4"
              icon={{
                ariaLabel: 'close-display-accessibility-menu',
                className: 'stroke-2 secondary-stroke size-full',
                Component: ArrowLeftIcon,
              }}
              onClick={handleClose}
              tooltilp={false}
            />
          </div>
          <h1
            className="text-primary truncate text-left text-2xl font-bold"
            id="profile-dropdown-display-accessibility-title"
          >
            {t('title')}
          </h1>
          <h2
            className="sr-only"
            id="profile-dropdown-display-accessibility-description"
          >
            {t('description')}
          </h2>
        </div>
        <div className="mb-2 flex space-x-2">
          <div className="bg-primary hover:bg-secondary h-max rounded-full p-2 transition-colors">
            <MoonIcon className="fill-primary primary-stroke size-6" />
          </div>
          <div>
            <h2 className="text-primary text-lg font-semibold">
              {t('dark-mode.title')}
            </h2>
            <p className="text-secondary text-sm">
              {t('dark-mode.description')}
            </p>
          </div>
        </div>
        <fieldset className="mb-4 ml-10">
          <legend className="sr-only">{t('dark-mode.legend')}</legend>
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
        </fieldset>
        <div className="mb-2 flex space-x-2">
          <div className="bg-primary hover:bg-secondary h-max rounded-full p-2 transition-colors">
            <ArrowsPointingOutIcon className="fill-primary primary-stroke size-6" />
          </div>
          <div>
            <h2 className="text-primary text-lg font-semibold">
              {t('full-screen.title')}
            </h2>
            <p className="text-secondary pr-4 text-sm">
              {t('full-screen.description')}
            </p>
          </div>
        </div>
        <fieldset className="mb-4 ml-10">
          <legend className="sr-only">{t('full-screen.legend')}</legend>
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
        </fieldset>
      </div>
    </div>
  );
};
