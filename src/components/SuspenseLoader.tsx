import { useTranslations } from 'next-intl';
import { BeatLoader } from 'react-spinners';

export const SuspenseLoader = () => {
  const t = useTranslations('suspense-loader');

  return (
    <div
      aria-busy="true"
      aria-label={t('aria-label')}
      className="flex-center-justify-center pt-[22px] md:w-5/12"
      role="status"
    >
      <BeatLoader color="#2C64F6" size={16} />
    </div>
  );
};
