import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Feeling } from '@/modules/posts/create/assets/types';

interface CreatePostFeelingsItemProps {
  name: Feeling;
  onClick: (feeling: Feeling) => void;
  selected: boolean;
}

export const CreatePostFeelingsItem = ({
  name,
  onClick,
  selected,
}: CreatePostFeelingsItemProps) => {
  const t = useTranslations('posts.create.feelings');

  const handleSelect = () => onClick(name);

  return (
    <button
      aria-pressed={selected}
      className={classNames(
        'duration-150 flex hover:bg-gray-200 items-center p-2 rounded-lg space-x-2.5 transition w-full dark:hover:bg-dark-600',
        {
          'bg-gray-300 dark:bg-dark-400': selected,
        }
      )}
      onClick={handleSelect}
      type="button"
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
