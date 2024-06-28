import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { NoProfilePicImage } from '@/components/images';

interface ProfilePicProps {
  alt?: string;
  image: string;
}

export const ProfilePic = ({ alt, image }: ProfilePicProps) => {
  const t = useTranslations('images');

  return image ? (
    <Image
      alt={alt ? alt : t('profile-pic')}
      className="rounded-full size-10"
      height={80}
      loading="eager"
      src={image}
      quality={100}
      width={80}
    />
  ) : (
    <NoProfilePicImage />
  );
};
