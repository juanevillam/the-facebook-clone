'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { NoProfilePicImage } from '@/components/images';
import { useCurrentUser } from '@/hooks';

type ProfilePicProps = {
  image?: string;
  name?: string;
};

export const ProfilePic = ({ image, name }: ProfilePicProps) => {
  const t = useTranslations('images');
  const currentUser = useCurrentUser();
  const imagetoShow = image || (image === undefined && currentUser?.image);
  const nametoShow = name || (name === undefined && currentUser?.name);

  return imagetoShow ? (
    <Image
      alt={t('profile-pic', { name: nametoShow || 'user' })}
      className="size-10 rounded-full"
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
