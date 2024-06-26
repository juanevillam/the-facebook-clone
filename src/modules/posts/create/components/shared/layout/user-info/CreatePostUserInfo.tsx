import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_LAYOUT_HEADER_PATH } from '@/modules/posts/create/assets/translations';
import { setActiveGif } from '@/modules/posts/create/reducers/gifsSlice';

import { CreatePostGifsItem } from '../../steps/gifs/item/CreatePostGifsItem';

export const CreatePostUserInfo = () => {
  const tUserInfo = useTranslations(
    `${POSTS_CREATE_LAYOUT_HEADER_PATH}.user-info`
  );

  const tFeelings = useTranslations('posts.create.steps.feelings.list');
  const user = useCurrentUser();

  const dispatch = useAppDispatch();
  const { activeFeeling } = useAppSelector(
    (store) => store.posts.create.feelings
  );

  const { activeLocation } = useAppSelector(
    (store) => store.posts.create.checkIn
  );

  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);

  const handleRemoveActiveGif = () => dispatch(setActiveGif(null));

  return (
    <div className="flex items-center justify-between p-3 md:p-4">
      <div
        className={classNames('flex items-center', {
          'md:w-3/4': activeGif,
        })}
      >
        <ProfilePic />
        <div className="flex flex-wrap items-center ml-2 md:ml-3">
          <p className="font-semibold dark:text-gray-200">{user?.name}</p>
          {activeFeeling && (
            <div className="flex items-center dark:text-gray-200">
              <span className="whitespace-nowrap">
                &nbsp;{tUserInfo('is-feeling')}&nbsp;
              </span>
              <Image
                alt={tFeelings(activeFeeling)}
                height={20}
                loading="eager"
                src={`/images/feelings/${activeFeeling}-icon.png`}
                width={20}
              />
              <span className="font-semibold whitespace-nowrap">
                &nbsp;{tFeelings(activeFeeling)}
              </span>
            </div>
          )}
          {activeLocation && (
            <div className="flex items-center dark:text-gray-200">
              {!activeFeeling && (
                <span className="whitespace-nowrap">
                  &nbsp;{tUserInfo('is')}
                </span>
              )}
              <span className="whitespace-nowrap">&nbsp;{tUserInfo('in')}</span>
              <span className="font-semibold whitespace-nowrap">
                &nbsp;{activeLocation.structured_formatting.main_text}
              </span>
            </div>
          )}
        </div>
      </div>
      {activeGif && (
        <div className="hidden md:block md:size-10">
          <CreatePostGifsItem gif={activeGif} onClick={handleRemoveActiveGif} />
        </div>
      )}
    </div>
  );
};
