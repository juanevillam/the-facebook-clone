import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const NoProfilePicImage = () => {
  const t = useTranslations('images');

  return (
    <Image
      alt={t('no-profile-pic')}
      className="size-10 rounded-full"
      height={80}
      loading="eager"
      src="/images/no-profile-pic.png"
      quality={100}
      width={80}
    />
  );
};
