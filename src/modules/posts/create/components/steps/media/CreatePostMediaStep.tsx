import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ReactPlayer from 'react-player';

import { FileInputRef, InputEvent } from '@/assets/types';
import { CloseIcon, PhotoIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setMedia } from '@/modules/posts/create/reducers/mediaSlice';
import { setStep } from '@/modules/posts/create/reducers/postSlice';

import { CreatePostStepMessage } from '../ui';

type CreatePostMediaStepProps = {
  fileInputRef: FileInputRef;
};

export const CreatePostMediaStep = ({
  fileInputRef,
}: CreatePostMediaStepProps) => {
  const t = useTranslations('posts.create');
  const dispatch = useAppDispatch();
  const { file, type } = useAppSelector((store) => store.posts.create.media);

  const handleRemoveMedia = () => {
    dispatch(setMedia({ file: null, type: null }));
    dispatch(setStep('default'));
  };

  const handleOnClickMediaFile = () => {
    type === 'video'
      ? dispatch(setMedia({ file, type }))
      : fileInputRef?.current?.click();
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

            type: fileType as 'image' | 'video',
          })
        );
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full md:h-96 overflow-hidden relative md:border md:primary-border md:m-3 md:rounded-lg">
      {file && (
        <IconButton
          className="primary-bg hover:secondary-bg absolute right-2 size-10 md:size-9 top-2 z-10"
          icon={{
            className: 'stroke-2 primary-stroke md:secondary-stroke size-full',
            Component: CloseIcon,
            name: 'close',
          }}
          onClick={handleRemoveMedia}
        />
      )}
      <button
        className={classNames(
          'primary-transition overflow-hidden relative size-full',
          {
            'bg-black': file,
            'hover:primary-bg': !file,
          }
        )}
        onClick={handleOnClickMediaFile}
        type="button"
      >
        {file ? (
          type === 'image' ? (
            <Image
              alt={t('layout.footer.photo-video.short')}
              className="object-contain rounded-lg"
              fill
              src={file as string}
            />
          ) : (
            <ReactPlayer
              controls
              height="100%"
              loop
              url={file as string}
              width="100%"
            />
          )
        ) : (
          <CreatePostStepMessage Icon={PhotoIcon} message={t('steps.media')} />
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
  );
};
