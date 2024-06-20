import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const NoProfilePicImage = () => {
  const t = useTranslations('images');

  return (
    <Image
      alt={t('no-profile-pic')}
      className="rounded-full"
      height={40}
      loading="eager"
      priority
      src="/images/no-profile-pic.png"
      width={40}
    />
  );
};
