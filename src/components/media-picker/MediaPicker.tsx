import classNames from 'classnames';
import Image from 'next/image';

import { CloseIcon } from '@/assets/ui/icons';
import { VideoPlayer } from '@/components';
import { IconButton } from '@/components/buttons';

type MediaPickerProps = {
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
  className,
  file,
  fileInputRef,
  NoMediaComponent,
  onFileChange,
  onRemove,
  triggerFileInput,
  type,
}: MediaPickerProps) => {
  return (
    <div className={classNames('relative h-full overflow-hidden', className)}>
      {file && (
        <IconButton
          className="hover:secondary-bg absolute right-2 top-2 z-20 size-10"
          icon={{
            className: 'stroke-2 size-full',
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
              alt="Media preview"
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
          accept="image/*,video/*"
          hidden
          ref={fileInputRef}
          onChange={onFileChange}
        />
      </div>
    </div>
  );
};
