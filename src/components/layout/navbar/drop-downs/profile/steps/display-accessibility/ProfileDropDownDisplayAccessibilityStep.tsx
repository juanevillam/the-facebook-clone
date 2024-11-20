'use client';

import { useTranslations } from 'next-intl';

import { SetValue } from '@/assets/types';
import {
  ArrowLeftIcon,
  ArrowsPointingOutIcon,
  MoonIcon,
} from '@/assets/ui/icons';
import { useTheme, useFullScreen } from '@/hooks';

import { ProfileDropDownDisplayAccessibilityStepItem } from './ProfileDropDownDisplayAccessibilityStepItem';
import { DropDownHeaderIcon } from '../../../icons';
import { ProfileDropDownStep } from '../../types';

type ProfileDropDownDisplayAccessibilityStepProps = {
  setStep: SetValue<ProfileDropDownStep>;
};

export const ProfileDropDownDisplayAccessibilityStep = ({
  setStep,
}: ProfileDropDownDisplayAccessibilityStepProps) => {
  const t = useTranslations(
    'navbar.drop-downs.profile.steps.display-accessibility'
  );

  const [theme, changeTheme] = useTheme();
  const { isFullScreen, toggleFullScreen } = useFullScreen();

  const handleClose = () => setStep('default');

  const handleThemeChange = (newTheme: typeof theme) => () =>
    changeTheme(newTheme);

  return (
    <>
      <div className="flex-center mb-4 w-full space-x-2">
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
        <h1 className="primary-text text-2xl font-bold">{t('title')}</h1>
      </div>
      <div className="mb-2 flex space-x-2">
        <div className="primary-bg primary-transition h-max rounded-full p-2">
          <MoonIcon className="primary-fill size-6" />
        </div>
        <div>
          <h1 className="primary-text text-lg font-semibold">
            {t('dark-mode.title')}
          </h1>
          <p className="secondary-text pr-4 text-sm">
            {t('dark-mode.description')}
          </p>
        </div>
      </div>
      <div className="mb-4 ml-10">
        <ProfileDropDownDisplayAccessibilityStepItem
          checked={theme === 'light'}
          label="off"
          name="theme"
          onChange={handleThemeChange('light')}
        />
        <ProfileDropDownDisplayAccessibilityStepItem
          checked={theme === 'dark'}
          label="on"
          name="theme"
          onChange={handleThemeChange('dark')}
        />
        <ProfileDropDownDisplayAccessibilityStepItem
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
        <ProfileDropDownDisplayAccessibilityStepItem
          checked={!isFullScreen}
          label="off"
          name="full-screen"
          onChange={toggleFullScreen}
        />
        <ProfileDropDownDisplayAccessibilityStepItem
          checked={isFullScreen}
          label="on"
          name="full-screen"
          onChange={toggleFullScreen}
        />
      </div>
    </>
  );
};
