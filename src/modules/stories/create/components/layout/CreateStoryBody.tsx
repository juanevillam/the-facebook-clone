'use client';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { PhotoIcon } from '@/assets/icons';
import { MediaType } from '@/assets/types';
import { MediaPicker } from '@/components';
import { useMedia } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { setCreateStoryMedia } from '../../reducers/createStoryMediaReducer';

export const CreateStoryBody = () => {
  const t = useTranslations('stories.create.layout.body.photo');
  const dispatch = useAppDispatch();
  const { file, type } = useAppSelector(
    (store) => store.stories.createStory.createStoryMedia
  );

  const { posting } = useAppSelector(
    (store) => store.stories.createStory.createStoryStory
  );

  const onChangeMedia = (file: string, type: MediaType) =>
    dispatch(setCreateStoryMedia({ file, type }));

  const removeMedia = () =>
    dispatch(setCreateStoryMedia({ file: null, type: null }));

  const { fileInputRef, handleFileChange, triggerFileInput } = useMedia(
    onChangeMedia,
    type
  );

  return (
    <div
      className={classNames(
        'relative flex size-full md:items-center md:justify-center md:bg-gray-100 md:dark:bg-neutral-900',
        {
          'md:p-6': file,
          'p-3 md:p-6': !file,
        }
      )}
    >
      <MediaPicker
        accept="image/*"
        actionLoader={{
          className: 'md:absolute',
          show: posting,
        }}
        className={classNames('md:rounded-xl', {
          'h-full w-full md:w-4/5': file,
          'h-max w-1/2 rounded-md md:w-max': !file,
        })}
        file={file}
        fileInputRef={fileInputRef}
        NoMediaComponent={
          <div className="primary-transition flex h-44 w-full flex-col items-center justify-center space-y-1 rounded-md bg-gradient-to-b from-green-400 to-blue-500 text-center font-medium text-white hover:opacity-85 md:h-96 md:w-64 md:space-y-2 md:rounded-xl md:from-green-400/95 md:to-blue-500/95 md:font-semibold">
            <div className="mb-1 rounded-full bg-white p-2 shadow-md">
              <PhotoIcon className="primary-text-light size-7 md:size-6" />
            </div>
            <h1 className="only-desktop-block">{t('detailed')}</h1>
            <h1 className="only-mobile">{t('short')}</h1>
          </div>
        }
        onFileChange={handleFileChange}
        onRemove={removeMedia}
        triggerFileInput={triggerFileInput}
        type={type}
      />
    </div>
  );
};
