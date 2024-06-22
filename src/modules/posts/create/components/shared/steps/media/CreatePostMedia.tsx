import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ReactPlayer from 'react-player';

import { FileInputRef, InputEvent } from '@/assets/types';
import { CloseIcon, PhotoIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setMedia } from '@/modules/posts/create/reducers/mediaSlice';

interface CreatePostMediaProps {
  fileInputRef: FileInputRef;
}

export const CreatePostMedia = ({ fileInputRef }: CreatePostMediaProps) => {
  const t = useTranslations('posts.create');
  const dispatch = useAppDispatch();
  const { file, playing, type } = useAppSelector(
    (store) => store.posts.create.media
  );

  const handleRemoveMedia = () =>
    dispatch(setMedia({ file: '', playing: false, type: null }));

  const handleOnClickMediaFile = () => {
    if (type === 'video') dispatch(setMedia({ file, type, playing: !playing }));
    else fileInputRef?.current?.click();
  };

  const handleMediaFile = (event: InputEvent) => {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      const fileType = file.type.split('/')[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          setMedia({
            file: reader.result as string,
            playing: false,
            type: fileType,
          })
        );
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full md:h-96 md:p-4">
      <div className="border-gray-300 h-full relative dark:border-dark-50 md:border md:p-2 md:rounded-lg">
        {file && (
          <IconButton
            className="absolute bg-white border border-gray-200 hover:bg-gray-200 right-2 size-10 text-gray-500 top-2 z-10 dark:bg-dark-200 dark:border-none dark:hover:bg-dark-700 dark:shadow-sm dark:text-gray-400 md:right-4 md:size-9 md:top-4"
            icon={{
              className:
                'size-full stroke-black stroke-2 dark:stroke-gray-400 md:stroke-gray-500',
              Component: CloseIcon,
              name: 'close',
            }}
            onClick={handleRemoveMedia}
          />
        )}
        <button
          className={`duration-150 h-full relative transition w-full md:bg-gray-100 md:rounded-lg md:dark:bg-dark-600 ${
            file ? 'bg-black' : 'hover:bg-gray-200 dark:hover:bg-dark-700'
          }`}
          onClick={handleOnClickMediaFile}
          type="button"
        >
          {file ? (
            type === 'image' ? (
              <Image
                alt={t('actions.photo-video.desktop')}
                className="object-contain rounded-lg"
                fill
                src={file as string}
              />
            ) : (
              <ReactPlayer
                height="100%"
                playing={playing}
                url={file as string}
                width="100%"
              />
            )
          ) : (
            <div className="flex flex-col h-full items-center justify-center">
              <div className="mb-1 p-3 rounded-full md:bg-gray-200 md:mb-2 md:p-2.5 md:dark:bg-dark-700">
                <PhotoIcon className="size-10 dark:text-gray-200 md:size-6" />
              </div>
              <h1 className="font-medium dark:text-gray-200 md:text-sm">
                {t('media-container.title')}
              </h1>
            </div>
          )}
          <input
            accept="image/*,video/*"
            hidden
            onChange={handleMediaFile}
            ref={fileInputRef}
            type="file"
          />
        </button>
      </div>
    </div>
  );
};
