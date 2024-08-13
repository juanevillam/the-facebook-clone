'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { NoProfilePicImage } from '@/components/images';
import { useCurrentUser } from '@/hooks';

interface ProfilePicProps {
  image?: string;
  name?: string;
}

export const ProfilePic = ({ image, name }: ProfilePicProps) => {
  const t = useTranslations('images');
  const user = useCurrentUser();

  const imagetoShow = image || (image === undefined && user?.image);
  const nametoShow = name || (name === undefined && user?.name);

  return imagetoShow ? (
    <Image
      alt={t('profile-pic', { name: nametoShow || 'user' })}
      className="rounded-full size-10"
      height={80}
      loading="eager"
      src={imagetoShow}
      quality={100}
      width={80}
    />
  ) : (
    <NoProfilePicImage />
  );
};
