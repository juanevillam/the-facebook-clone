import Image from 'next/image';

import { GIF } from '@/modules/posts/create/assets/types';

interface CreatePostGifsItemProps {
  gif: GIF;
  onClick: (gif: GIF) => void;
}

export const CreatePostGifsItem = ({
  gif,
  onClick,
}: CreatePostGifsItemProps) => {
  const handleSelect = () => onClick(gif);

  return (
    <button
      className="group h-full overflow-hidden relative rounded-lg w-full"
      onClick={handleSelect}
      type="button"
    >
      <Image
        alt={gif.title}
        className="duration-150 ease-in-out group-hover:scale-110 object-cover size-full transform transition-transform"
        height={gif.height}
        src={gif.url}
        unoptimized
        width={gif.width}
      />
    </button>
  );
};
