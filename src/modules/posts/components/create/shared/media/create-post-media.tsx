import { ChangeEvent } from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ReactPlayer from 'react-player';

import { filePickerType } from '@/assets/types';
import { CloseIcon, PhotoIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setMedia } from '@/lib/store/reducers/posts-reducer';

interface CreatePostMediaProps {
  filePicker: filePickerType;
}

export const CreatePostMedia = ({ filePicker }: CreatePostMediaProps) => {
  const t = useTranslations('posts.create');
  const dispatch = useAppDispatch();
  const { media } = useAppSelector((store) => store.postsReducer);

  const removeMedia = () => {
    dispatch(
      setMedia({
        file: '',
        playing: false,
        type: null,
      })
    );
  };

  const onClickMediaFile = () => {
    if (media.type === 'video') {
      dispatch(
        setMedia({
          ...media,
          playing: !media.playing,
        })
      );
    } else filePicker?.current?.click();
  };

  const handleMediaFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      const fileType = file.type.split('/')[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          setMedia({
            ...media,
            file: reader.result,
            type: fileType,
          })
        );
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full md:h-96 md:p-4">
      <div className="border-gray-300 h-full relative md:border md:p-2 md:rounded-lg dark:border-dark-50">
        {/* {media.file && (
          <CloseIcon
            className="absolute cursor-pointer duration-150 hover:bg-gray-200 p-2 right-2 rounded-full shadow-sm size-10 text-gray-500 top-2 transition z-10 md:p-1.5 md:right-4 md:size-8 md:top-4 dark:bg-dark-100 dark:hover:bg-dark-1100 dark:text-smoke-1500"
            onClick={removeMedia}
          />
        )} */}
        {media.file && (
          <IconButton
            className="absolute bg-white border border-gray-200 hover:bg-gray-200 right-2 size-10 text-gray-500 top-2 z-10 md:right-4 md:size-9 md:top-4 dark:bg-dark-200 dark:hover:bg-dark-800 dark:border-none dark:shadow-sm dark:text-smoke-1200"
            icon={{
              className:
                'size-full stroke-black stroke-2 md:stroke-gray-500 dark:stroke-smoke-1200',
              Component: CloseIcon,
              name: 'close',
            }}
            onClick={removeMedia}
          />
        )}
        <button
          className={`duration-150 h-full relative transition md:bg-smoke-1400 md:rounded-lg w-full dark:md:bg-dark-700 ${
            media.file
              ? 'bg-black'
              : 'hover:bg-smoke-1500 dark:hover:bg-dark-800'
          }`}
          onClick={onClickMediaFile}
          type="button"
        >
          {media.file ? (
            media.type === 'image' ? (
              <Image
                alt={t('actions.photo-video.desktop')}
                className="object-contain rounded-lg"
                fill
                src={media.file as string}
              />
            ) : (
              <ReactPlayer
                height="100%"
                playing={media.playing}
                url={media.file as string}
                width="100%"
              />
            )
          ) : (
            <div className="flex flex-col h-full items-center justify-center">
              <div className="mb-1 p-3 rounded-full md:bg-smoke-1500 md:mb-2 md:p-2.5 md:dark:bg-dark-800">
                <PhotoIcon className="size-10 md:size-6 dark:text-smoke-1300" />
              </div>
              <h1 className="font-medium md:text-sm dark:text-smoke-1300">
                {t('media-container.title')}
              </h1>
            </div>
          )}
          <input
            accept="image/*,video/*"
            hidden
            onChange={handleMediaFile}
            ref={filePicker}
            type="file"
          />
        </button>
      </div>
    </div>
  );
};
