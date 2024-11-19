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

import { ProfileOption } from './option/ProfileOption';

type ProfileDropDownProps = {
  setOpenProfileDropDown: SetValue<boolean>;
};

export const ProfileDropDown = ({
  setOpenProfileDropDown,
}: ProfileDropDownProps) => {
  const t = useTranslations('navbar.drop-downs.profile');
  const currentUser = useCurrentUser();

  const handleClose = () => setOpenProfileDropDown(false);

  const handleLogout = () => logout();

  return (
    <div className="card primary-transition only-desktop-block absolute right-5 top-14 w-80 p-2 shadow-lg">
      <Link
        className="flex-center primary-transition hover:primary-bg space-x-2.5 rounded-lg p-2"
        href="/profile"
        onClick={handleClose}
      >
        <ProfilePic variant="large" />
        <div>
          <h1 className="primary-text text-lg font-semibold leading-snug">
            {currentUser?.name}
          </h1>
          <p className="secondary-text -mt-px">{t('profile-preview.title')}</p>
        </div>
      </Link>
      <hr className="primary-border my-2" />
      <ProfileOption
        dropdown
        Icon={CogIcon}
        label="settings-privacy"
        onClick={() => {}}
      />
      <ProfileOption
        dropdown
        Icon={MoonIcon}
        label="display-accessibility"
        onClick={() => {}}
      />
      <ProfileOption
        Icon={ArrowRightStartOnRectangleIcon}
        label="log-out"
        onClick={handleLogout}
      />
    </div>
  );
};
