import Image from 'next/image';

import { CloseIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { GIF } from '@/modules/posts/create/assets/types';

interface CreatePostGifsItemProps {
  active?: boolean;
  gif: GIF;
  onClick: (gif: GIF) => void;
}

export const CreatePostGifsItem = ({
  active,
  gif,
  onClick,
}: CreatePostGifsItemProps) => {
  const handleSelect = () => onClick(gif);

  return (
    <div
      className="group h-full overflow-hidden relative rounded-lg w-full"
      onClick={handleSelect}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleSelect();
      }}
      role="button"
      tabIndex={0}
    >
      {active && (
        <IconButton
          className="absolute bg-white border border-gray-200 hover:bg-gray-200 right-2 size-10 text-gray-500 top-2 z-10 dark:bg-dark-200 dark:border-none dark:hover:bg-dark-700 dark:shadow-sm dark:text-gray-400 md:size-9"
          icon={{
            className:
              'size-full stroke-black stroke-2 dark:stroke-gray-300 md:stroke-gray-500 md:dark-stroke-gray-400',
            Component: CloseIcon,
            name: 'close',
          }}
          onClick={handleSelect}
        />
      )}
      <Image
        alt={gif.title}
        className="duration-150 ease-in-out group-hover:scale-110 object-cover size-full transform transition-transform"
        height={gif.height}
        src={gif.url}
        unoptimized
        width={gif.width}
      />
    </div>
  );
};
