import classNames from 'classnames';
import Image from 'next/image';

import { ImageType, VoidFunction } from '@/assets/types';

interface CreatePostCardItemProps {
  active: boolean;
  disabled?: boolean;
  image: ImageType;
  label: {
    mobile: string;
    desktop: string;
  };
  onClick: VoidFunction;
}

export const CreatePostCardItem = ({
  active,
  disabled,
  image,
  label,
  onClick,
}: CreatePostCardItemProps) => {
  return (
    <button
      aria-disabled={disabled}
      className={classNames(
        'duration-150 flex items-center justify-center p-3 space-x-2 transition w-full md:p-2 md:rounded-lg hover:bg-gray-100 dark:hover:bg-dark-200',
        {
          'bg-gray-200 dark:bg-dark-400': active,
          'opacity-50': disabled,
        }
      )}
      onClick={onClick}
      type="button"
    >
      <div className="relative size-5 md:size-6">
        <Image
          alt={image.alt}
          fill
          loading="eager"
          sizes="1.5rem"
          src={`/images/${image.src}-icon.png`}
        />
      </div>
      <p className="font-medium hidden text-gray-600 text-sm dark:text-gray-400 md:block">
        {label.desktop}
      </p>
      <p className="text-gray-600 text-sm dark:text-gray-400 md:hidden">
        {label.mobile}
      </p>
    </button>
  );
};
