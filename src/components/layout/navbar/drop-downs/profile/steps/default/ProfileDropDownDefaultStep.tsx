import { useTranslations } from 'next-intl';

import {
  ArrowRightStartOnRectangleIcon,
  CogIcon,
  MoonIcon,
} from '@/assets/icons';
import { SetValue } from '@/assets/types';
import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { logout } from '@/modules/auth/services/authenticationService';
import { Link } from '@/navigation';

import { ProfileDropDownDefaultStepItem } from './ProfileDropDownDefaultStepItem';
import { ProfileDropDownStep } from '../../types';

type ProfileDropDownDefaultStepProps = {
  setOpenProfileDropDown?: SetValue<boolean>;
  setStep: SetValue<ProfileDropDownStep>;
};

export const ProfileDropDownDefaultStep = ({
  setOpenProfileDropDown,
  setStep,
}: ProfileDropDownDefaultStepProps) => {
  const t = useTranslations('navbar.drop-downs.profile');
  const currentUser = useCurrentUser();

  const handleClose = () =>
    setOpenProfileDropDown && setOpenProfileDropDown(false);

  const handleOpenSettingsStep = () => setStep('settings');

  const handleOpenDisplayAccessibilityStep = () =>
    setStep('display-accessibility');

  const handleLogout = () => logout();

  return (
    <div className="p-2.5">
      <h1 className="sr-only" id="profile-dropdown-default-title">
        {t('title')}
      </h1>
      <h2 className="sr-only" id="profile-dropdown-default-description">
        {t('description')}
      </h2>
      <Link
        className="card flex-align-center hover:bg-primary space-x-2.5 rounded-lg p-2 transition-colors"
        href="/profile"
        onClick={handleClose}
      >
        <ProfilePic variant="large" />
        <div className="flex-1 overflow-hidden">
          <h1 className="text-primary truncate text-lg font-semibold leading-snug">
            {currentUser?.name}
          </h1>
          <p className="text-secondary text-sm">@{currentUser?.username}</p>
        </div>
      </Link>
      <hr className="md:border-primary my-1 border-transparent transition-colors md:my-2" />
      <section aria-labelledby="profile-dropdown-default-description">
        <div className="space-y-2 md:space-y-0">
          <ProfileDropDownDefaultStepItem
            dropdown
            Icon={CogIcon}
            label="settings"
            onClick={handleOpenSettingsStep}
          />
          <ProfileDropDownDefaultStepItem
            dropdown
            Icon={MoonIcon}
            label="display-accessibility"
            onClick={handleOpenDisplayAccessibilityStep}
          />
          <ProfileDropDownDefaultStepItem
            Icon={ArrowRightStartOnRectangleIcon}
            label="log-out"
            onClick={handleLogout}
          />
        </div>
      </section>
    </div>
  );
};
