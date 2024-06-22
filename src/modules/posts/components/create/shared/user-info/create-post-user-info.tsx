import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { NoProfilePicImage } from '@/components/images';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setActiveGif } from '@/lib/store/reducers/posts-reducer';

import { CreatePostGifsItem } from '../gifs/item/create-post-gifs-item';

export const CreatePostUserInfo = () => {
  const t = useTranslations('posts.create');
  const dispatch = useAppDispatch();
  const { checkIn, feelings, gifs } = useAppSelector(
    (store) => store.postsReducer
  );

  const removeActiveGif = () => dispatch(setActiveGif(null));

  return (
    <div className="flex items-center justify-between p-3 md:p-4">
      <div className="flex items-center">
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
              <span className="whitespace-nowrap">
                &nbsp;{t('user-info.in')}
              </span>
              <span className="font-semibold whitespace-nowrap">
                &nbsp;{checkIn.activeLocation.structured_formatting.main_text}
              </span>
            </div>
          )}
        </div>
      </div>
      {gifs.activeGif && (
        <div className="size-10">
          <CreatePostGifsItem gif={gifs.activeGif} onClick={removeActiveGif} />
        </div>
      )}
    </div>
  );
};
