import { useTranslations } from 'next-intl';

import { SetValue } from '@/assets/types';
import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { Link } from '@/navigation';

type ProfileDropDownProps = {
  setOpenProfileDropDown: SetValue<boolean>;
};

export const ProfileDropDown = ({
  setOpenProfileDropDown,
}: ProfileDropDownProps) => {
  const t = useTranslations('navbar.drop-downs.profile');
  const currentUser = useCurrentUser();

  const handleClose = () => setOpenProfileDropDown(false);

  return (
    <div className="card primary-transition only-desktop-block absolute right-5 top-14 w-80 px-3 py-2 shadow-lg">
      <Link
        className="flex-center primary-transition hover:primary-bg space-x-2.5 rounded-lg p-2"
        href="/profile"
        onClick={handleClose}
      >
        <ProfilePic variant="large" />
        <div>
          <h1 className="primary-text text-lg font-semibold">
            {currentUser?.name}
          </h1>
          <p className="secondary-text -mt-px">{t('profile-preview.title')}</p>
        </div>
      </Link>
    </div>
  );
};
