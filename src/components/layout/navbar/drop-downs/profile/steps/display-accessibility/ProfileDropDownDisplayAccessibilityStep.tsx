'use client';

import { useTranslations } from 'next-intl';

import { SetValue } from '@/assets/types';
import { ArrowLeftIcon, MoonIcon } from '@/assets/ui/icons';
import { useTheme } from '@/hooks';

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

  const handleClose = () => setStep('default');

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
      <div className="ml-10">
        <ProfileDropDownDisplayAccessibilityStepItem
          changeTheme={changeTheme}
          label="off"
          theme={theme}
          value="light"
        />
        <ProfileDropDownDisplayAccessibilityStepItem
          changeTheme={changeTheme}
          label="on"
          theme={theme}
          value="dark"
        />
        <ProfileDropDownDisplayAccessibilityStepItem
          changeTheme={changeTheme}
          label="automatic"
          theme={theme}
          value="system"
        />
      </div>
    </>
  );
};
