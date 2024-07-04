import Image from 'next/image';

import { CloseIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { GIF } from '@/modules/posts/create/assets/types';

interface CreatePostGifsItemProps {
  active?: boolean;
  gif: GIF;
  onClick: (gif: GIF) => void;
}

export const CreatePostGifsStepItem = ({
  active,
  gif,
  onClick,
}: CreatePostGifsItemProps) => {
  const handleSelect = () => onClick(gif);

  return (
    <div
      className="create-post-modal-gif-size group overflow-hidden relative rounded-lg"
      onClick={handleSelect}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleSelect();
      }}
      role="button"
      tabIndex={0}
    >
      {active && (
        <IconButton
          className="absolute main-bg hover:main-bg-hover right-2 size-8 top-2 z-10"
          icon={{
            className: 'stroke-2 main-stroke md:secondary-stroke size-full',
            Component: CloseIcon,
            name: 'close',
          }}
          onClick={handleSelect}
        />
      )}
      <Image
        alt={gif.title}
        className="object-cover size-full transform transition-transform duration-150 ease-in-out group-hover:scale-110"
        height={gif.height}
        src={gif.url}
        unoptimized
        width={gif.width}
      />
    </div>
  );
};
