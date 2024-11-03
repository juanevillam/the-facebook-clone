import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { POWERED_BY_GIPHY_IMAGE_SIZE } from './PoweredByGiphyImage';

export const PoweredByGiphyBlackImage = () => {
  const t = useTranslations('images');

  return (
    <Image
      alt={t('powered-by-giphy')}
      height={POWERED_BY_GIPHY_IMAGE_SIZE}
      src="/images/giphy/powered-by-giphy-black.png"
      width={POWERED_BY_GIPHY_IMAGE_SIZE}
    />
  );
};
