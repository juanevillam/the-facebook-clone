import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const NoProfilePicImage = () => {
  const t = useTranslations('images');

  return (
    <Image
      alt={t('no-profile-pic')}
      className="rounded-full size-10"
      height={80}
      loading="eager"
      src="/images/no-profile-pic.png"
      quality={100}
      width={80}
    />
  );
};
