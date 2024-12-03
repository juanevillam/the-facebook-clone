import Image from 'next/image';

import { CloseIcon } from '@/assets/icons';
import { IconButton } from '@/components/buttons';
import { GIF } from '@/modules/posts/create/types';

type CreatePostGifsItemProps = {
  active?: boolean;
  gif: GIF;
  onClick: (gif: GIF) => void;
};

export const CreatePostGifsStepItem = ({
  active,
  gif,
  onClick,
}: CreatePostGifsItemProps) => {
  const handleSelect = () => onClick(gif);

  return (
    <div
      className="create-post-modal-gif-size group relative overflow-hidden rounded-lg"
      onClick={handleSelect}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleSelect();
      }}
      role="button"
      tabIndex={0}
    >
      {active && (
        <IconButton
          className="primary-bg hover:secondary-bg absolute right-2 top-2 z-10 size-8"
          icon={{
            ariaLabel: 'remove-gif',
            className: 'stroke-2 primary-stroke md:secondary-stroke size-full',
            Component: CloseIcon,
          }}
          onClick={handleSelect}
        />
      )}
      <Image
        alt={gif.title}
        className="size-full transform object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        height={gif.height}
        src={gif.url}
        unoptimized
        width={gif.width}
      />
    </div>
  );
};
