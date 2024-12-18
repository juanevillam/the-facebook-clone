'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { NoProfilePicImage } from '@/components/images';
import { useCurrentUser } from '@/hooks';

type ProfilePicProps = {
  customClassName?: string;
  image?: string;
  name?: string;
  variant?: 'medium' | 'large';
};

const sizes = {
  medium: {
    className: 'size-10',
    size: 80,
  },
  large: {
    className: 'size-16',
    size: 128,
  },
};

export const ProfilePic = ({
  customClassName,
  image,
  name,
  variant = 'medium',
}: ProfilePicProps) => {
  const { className, size } = sizes[variant];
  const t = useTranslations('images');
  const currentUser = useCurrentUser();
  const imagetoShow = image || (image === undefined && currentUser?.image);
  const nametoShow = name || (name === undefined && currentUser?.name);

  return imagetoShow ? (
    <Image
      alt={t('profile-pic', { user: nametoShow || 'user' })}
      className={`rounded-full ${className} ${customClassName}`}
      height={size}
      loading="eager"
      priority
      src={imagetoShow}
      quality={100}
      width={size}
    />
  ) : (
    <NoProfilePicImage
      className={`${className} ${customClassName}`}
      size={size}
    />
  );
};
