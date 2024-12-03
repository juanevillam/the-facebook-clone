import Image from 'next/image';
import { useTranslations } from 'next-intl';

type NoProfilePicImageProps = {
  className: string;
  size: number;
};

export const NoProfilePicImage = ({
  className,
  size,
}: NoProfilePicImageProps) => {
  const t = useTranslations('images');

  return (
    <Image
      alt={t('no-profile-pic')}
      className={`rounded-full ${className}`}
      height={size}
      loading="eager"
      src="/images/no-profile-pic.png"
      quality={100}
      width={size}
    />
  );
};
