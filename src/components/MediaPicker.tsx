import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { CloseIcon } from '@/assets/icons';
import { ActionLoader, VideoPlayer } from '@/components';
import { IconButton } from '@/components/buttons';

type MediaPickerProps = {
  accept?: 'image/*' | 'image/*,video/*';
  actionLoader?: {
    className: string;
    show: boolean;
  };
  className?: string;
  file: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  NoMediaComponent: React.ReactNode;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: VoidFunction;
  triggerFileInput: VoidFunction;
  type: 'image' | 'video' | null;
};

export const MediaPicker = ({
  accept = 'image/*,video/*',
  actionLoader,
  className,
  file,
  fileInputRef,
  NoMediaComponent,
  onFileChange,
  onRemove,
  triggerFileInput,
  type,
}: MediaPickerProps) => {
  const t = useTranslations('images');

  return (
    <div className={classNames('relative h-full overflow-hidden', className)}>
      {file && (
        <IconButton
          className="absolute right-2 top-2 z-20 size-10 bg-neutral-900 bg-opacity-50 hover:bg-neutral-700 hover:bg-opacity-50"
          icon={{
            className: 'stroke-2 stroke-white size-full',
            Component: CloseIcon,
            name: 'close',
          }}
          onClick={onRemove}
        />
      )}
      <div
        className={classNames('primary-transition relative size-full', {
          'bg-black': file,
          'hover:primary-bg': !file,
        })}
        onClick={triggerFileInput}
        onKeyPress={(e) =>
          (e.key === 'Enter' || e.key === ' ') && triggerFileInput()
        }
        role="button"
        tabIndex={0}
      >
        {file ? (
          type === 'image' ? (
            <Image
              alt={t('media-preview')}
              className="object-contain"
              fill
              src={file}
            />
          ) : (
            <VideoPlayer url={file} />
          )
        ) : (
          NoMediaComponent
        )}
        <input
          type="file"
          accept={accept}
          hidden
          ref={fileInputRef}
          onChange={onFileChange}
        />
      </div>
      {actionLoader && (
        <ActionLoader
          className={actionLoader.className}
          message="posting"
          open={actionLoader.show}
        />
      )}
    </div>
  );
};
