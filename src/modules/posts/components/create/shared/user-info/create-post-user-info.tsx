import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { NoProfilePicImage } from '@/components/images';
import { useAppSelector } from '@/lib/store/hooks';

export const CreatePostUserInfo = () => {
  const t = useTranslations('posts.create');
  const { checkIn, feelings } = useAppSelector((store) => store.postsReducer);

  return (
    <div className="flex items-center p-3 md:p-4">
      <NoProfilePicImage />
      <div className="flex ml-2 md:ml-3 flex-wrap items-center">
        <p className="font-semibold dark:text-gray-200">Juan Villa</p>
        {feelings.activeFeeling && (
          <div className="flex items-center dark:text-gray-200">
            <span className="whitespace-nowrap">
              &nbsp;{t('user-info.is-feeling')}&nbsp;
            </span>
            <Image
              alt={t(`feelings.${feelings.activeFeeling}`)}
              height={20}
              loading="eager"
              src={`/images/feelings/${feelings.activeFeeling}-icon.png`}
              width={20}
            />
            <span className="font-semibold whitespace-nowrap">
              &nbsp;{t(`feelings.${feelings.activeFeeling}`)}
            </span>
          </div>
        )}
        {checkIn.activeLocation && (
          <div className="flex items-center dark:text-gray-200">
            {!feelings.activeFeeling && (
              <span className="whitespace-nowrap">
                &nbsp;{t('user-info.is')}
              </span>
            )}
            <span className="whitespace-nowrap">&nbsp;{t('user-info.in')}</span>
            <span className="font-semibold whitespace-nowrap">
              &nbsp;{checkIn.activeLocation.structured_formatting.main_text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
