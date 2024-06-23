import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { POSTS_CREATE_STEPS_FEELINGS_PATH } from '@/modules/posts/create/assets/translations';
import { Feeling } from '@/modules/posts/create/assets/types';

interface CreatePostFeelingsItemProps {
  active: boolean;
  name: Feeling;
  onClick: (feeling: Feeling) => void;
}

export const CreatePostFeelingsItem = ({
  active,
  name,
  onClick,
}: CreatePostFeelingsItemProps) => {
  const t = useTranslations(`${POSTS_CREATE_STEPS_FEELINGS_PATH}.list`);

  const handleSelect = () => onClick(name);

  return (
    <button
      aria-pressed={active}
      className={classNames(
        'duration-150 flex hover:bg-gray-200 items-center p-2 rounded-lg space-x-2.5 transition w-full dark:hover:bg-dark-600',
        {
          'bg-gray-300 dark:bg-dark-400': active,
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
