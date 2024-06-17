import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface AlertTriangleImageProps {
  size: number;
}

export const AlertTriangleImage = ({ size }: AlertTriangleImageProps) => {
  const t = useTranslations('images');

  return (
    <Image
      alt={t('alert-triangle')}
      height={size}
      src="/images/alert-triangle.webp"
      width={size}
    />
  );
};
