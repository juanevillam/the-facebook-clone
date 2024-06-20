import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { feelings } from '../create-post-feelings';

export type fellingType = (typeof feelings)[number];

interface CreatePostFeelingProps {
  name: fellingType;
  selected: boolean;
  onClick: (feeling: fellingType) => void;
}

export const CreatePostFeeling = ({
  name,
  selected,
  onClick,
}: CreatePostFeelingProps) => {
  const t = useTranslations('posts.create.feelings');

  const selectFeeling = () => onClick(name);

  return (
    <button
      className={`duration-150 flex hover:bg-gray-200 items-center p-2 rounded-lg space-x-2.5 transition w-full dark:hover:bg-dark-600 ${
        selected && 'bg-gray-300 dark:bg-dark-400'
      }`}
      onClick={selectFeeling}
    >
      <div className="bg-gray-200 duration-150 p-2 rounded-full transition dark:bg-dark-600">
        <Image
          alt={t(name)}
          height={20}
          loading="eager"
          src={`/images/feelings/${name}-icon.png`}
          width={20}
        />
      </div>
      <span className="dark:text-gray-200">{t(name)}</span>
    </button>
  );
};
