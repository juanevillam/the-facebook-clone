import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { FileInputRef, InputEvent } from '@/assets/types';
import { CloseIcon, PhotoIcon } from '@/assets/ui/icons';
import { VideoPlayer } from '@/components';
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
    <div className="md:primary-border relative h-full overflow-hidden md:m-3 md:h-96 md:rounded-lg md:border">
      {file && (
        <IconButton
          className="primary-bg hover:secondary-bg absolute right-2 top-2 z-20 size-10 md:size-9"
          icon={{
            className: 'stroke-2 primary-stroke md:secondary-stroke size-full',
            Component: CloseIcon,
            name: 'close',
          }}
          onClick={handleRemoveMedia}
        />
      )}
      <div
        className={classNames(
          'primary-transition relative size-full overflow-hidden',
          {
            'bg-black': file,
            'hover:primary-bg': !file,
          }
        )}
        onClick={handleOnClickMediaFile}
        onKeyPress={(e) =>
          (e.key === 'Enter' || e.key === ' ') && handleOnClickMediaFile()
        }
        role="button"
        tabIndex={0}
      >
        {file ? (
          type === 'image' ? (
            <Image
              alt={t('layout.footer.photo-video.short')}
              className="rounded-lg object-contain"
              fill
              src={file as string}
            />
          ) : (
            <VideoPlayer url={file} />
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
      </div>
    </div>
  );
};
