import Image from 'next/image';

import { imageType, voidFunctionType } from '@/assets/types';

interface CreatePostCardActionProps {
  active: boolean;
  image: imageType;
  label: {
    mobile: string;
    desktop: string;
  };
  onClick: voidFunctionType;
}

export const CreatePostCardAction = ({
  active,
  image,
  label,
  onClick,
}: CreatePostCardActionProps) => {
  return (
    <button
      className={`duration-150 flex hover:bg-gray-100 items-center justify-center p-3 space-x-2 transition w-full md:p-2 md:rounded-lg dark:hover:bg-dark-200 ${
        active && 'bg-gray-200 dark:bg-dark-400'
      }`}
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
      <p className="font-medium hidden text-gray-600 text-sm md:block dark:text-gray-400">
        {label.desktop}
      </p>
      <p className="text-gray-600 text-sm md:hidden dark:text-gray-400">
        {label.mobile}
      </p>
    </button>
  );
};
