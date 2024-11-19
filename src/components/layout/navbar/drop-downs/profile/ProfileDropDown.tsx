import { useTranslations } from 'next-intl';

import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { Link } from '@/navigation';

export const ProfileDropDown = () => {
  const t = useTranslations('navbar.drop-downs.profile');
  const currentUser = useCurrentUser();

  return (
    <div className="card primary-transition only-desktop-block absolute right-5 top-14 w-80 px-3 py-2 shadow-lg">
      <Link
        className="flex-center primary-transition hover:primary-bg space-x-2.5 rounded-lg p-2"
        href="/profile"
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
