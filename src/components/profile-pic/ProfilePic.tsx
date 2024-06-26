import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { NoProfilePicImage } from '@/components/images';
import { useCurrentUser } from '@/hooks';

export const ProfilePic = () => {
  const t = useTranslations('images');
  const user = useCurrentUser();

  return user?.image ? (
    <Image
      alt={t('profile-pic')}
      className="rounded-full size-10"
      height={80}
      loading="eager"
      src={user?.image}
      quality={100}
      width={80}
    />
  ) : (
    <NoProfilePicImage />
  );
};
