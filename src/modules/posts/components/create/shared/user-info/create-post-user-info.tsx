import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { NoProfilePicImage } from '@/components/images';
import { useAppSelector } from '@/lib/store/hooks';

export const CreatePostUserInfo = () => {
  const t = useTranslations('posts.create');
  const { activeFeeling } = useAppSelector((store) => store.postsReducer);

  return (
    <div className="flex items-center p-3 md:p-4">
      <NoProfilePicImage />
      <div className="flex ml-2 md:ml-3">
        <p className="font-semibold dark:text-gray-200">Juan Villa</p>
        {activeFeeling && (
          <div className="flex items-center dark:text-gray-200">
            <span>&nbsp;{t('user-info.is-feeling')}&nbsp;</span>
            <Image
              alt={t(`feelings.${activeFeeling}`)}
              height={20}
              loading="eager"
              src={`/images/feelings/${activeFeeling}-icon.png`}
              width={20}
            />
            <span className="font-semibold">
              &nbsp;{t(`feelings.${activeFeeling}`)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
