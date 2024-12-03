import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { SharedSvgProps } from '@/assets/icons/types';

export const ThumbUpImage = ({ className }: SharedSvgProps) => {
  const t = useTranslations('images');

  return (
    <Image
      alt={t('thumb-up')}
      className={className}
      height={16}
      src="/images/like-icon.svg"
      width={16}
    />
  );
};
