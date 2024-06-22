import Image from 'next/image';

export type unparsedGifType = {
  id: string;
  images: {
    fixed_height: {
      height: string;
      url: string;
      width: string;
    };
  };
  title: string;
};

export type gifType = {
  height: string;
  id: string;
  title: string;
  url: string;
  width: string;
};

interface CreatePostGifsItemProps {
  gif: gifType;
  onClick: (gif: gifType) => void;
}

export const CreatePostGifsItem = ({
  gif,
  onClick,
}: CreatePostGifsItemProps) => {
  const selectGif = () => onClick(gif);

  return (
    <button
      className="group overflow-hidden relative rounded-lg w-full"
      onClick={selectGif}
      type="button"
    >
      <Image
        alt={gif.title}
        className="duration-150 ease-in-out group-hover:scale-110 object-cover size-full transform transition-transform"
        height={parseInt(gif.height, 10)}
        src={gif.url}
        width={parseInt(gif.width, 10)}
      />
    </button>
  );
};
