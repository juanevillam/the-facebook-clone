import { useTranslations } from 'next-intl';

import { SetValue } from '@/assets/types';
import {
  ArrowRightStartOnRectangleIcon,
  CogIcon,
  MoonIcon,
} from '@/assets/ui/icons';
import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { logout } from '@/modules/auth/api';
import { Link } from '@/navigation';

import { ProfileDropDownDefaultStepItem } from './ProfileDropDownDefaultStepItem';
import { ProfileDropDownStep } from '../../types';

type ProfileDropDownDefaultStepProps = {
  setOpenProfileDropDown: SetValue<boolean>;
  setStep: SetValue<ProfileDropDownStep>;
};

export const ProfileDropDownDefaultStep = ({
  setOpenProfileDropDown,
  setStep,
}: ProfileDropDownDefaultStepProps) => {
  const t = useTranslations('navbar.drop-downs.profile');
  const currentUser = useCurrentUser();

  const handleClose = () => setOpenProfileDropDown(false);

  const handleOpenDisplayAccessibilityStep = () =>
    setStep('display-accessibility');

  const handleLogout = () => logout();

  return (
    <div className="p-2.5">
      <Link
        className="flex-center primary-transition hover:primary-bg space-x-2.5 rounded-lg p-2"
        href="/profile"
        onClick={handleClose}
      >
        <ProfilePic variant="large" />
        <h1 className="primary-text truncate text-lg font-semibold leading-snug">
          {currentUser?.name}
        </h1>
      </Link>
      <hr className="primary-border my-2" />
      <ProfileDropDownDefaultStepItem
        dropdown
        Icon={CogIcon}
        label="settings"
        onClick={() => {}}
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
  );
};
