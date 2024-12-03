import { useTranslations } from 'next-intl';

import {
  ArrowRightStartOnRectangleIcon,
  CogIcon,
  MoonIcon,
} from '@/assets/icons';
import { SetValue } from '@/assets/types';
import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { logout } from '@/modules/auth/api';
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
      <Link
        className="card flex-center primary-transition hover:primary-bg space-x-2.5 rounded-lg p-2"
        href="/profile"
        onClick={handleClose}
      >
        <ProfilePic variant="large" />
        <div className="flex-1 overflow-hidden">
          <h1 className="primary-text truncate text-lg font-semibold leading-snug">
            {currentUser?.name}
          </h1>
          <p className="secondary-text text-sm">@{currentUser?.username}</p>
        </div>
      </Link>
      <hr className="md:primary-border my-1 border-transparent md:my-2" />
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
    </div>
  );
};
