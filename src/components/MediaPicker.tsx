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
  const t = useTranslations();

  const handleKeyInteraction = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerFileInput();
    }
  };

  return (
    <div
      aria-busy={actionLoader?.show || undefined}
      aria-live="polite"
      className={classNames('relative h-full overflow-hidden', className)}
    >
      {file && (
        <IconButton
          className="absolute right-2 top-2 z-20 size-10 bg-neutral-900 bg-opacity-50 hover:bg-neutral-700 hover:bg-opacity-50"
          icon={{
            ariaLabel: 'remove-media',
            className: 'stroke-2 stroke-white size-full',
            Component: CloseIcon,
          }}
          onClick={onRemove}
        />
      )}
      <div
        aria-label={
          file ? t('media-picker.change-media') : t('media-picker.add-media')
        }
        className={classNames('relative size-full', {
          'bg-black': file,
          'hover:bg-primary': !file,
        })}
        onClick={triggerFileInput}
        onKeyDown={handleKeyInteraction}
        role="button"
        tabIndex={0}
      >
        {file ? (
          type === 'image' ? (
            <Image
              alt={t('images.media-preview')}
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
          accept={accept}
          aria-label={t('media-picker.file-input')}
          hidden
          onChange={onFileChange}
          ref={fileInputRef}
          type="file"
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
