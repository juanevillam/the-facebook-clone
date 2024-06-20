import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { imageType, voidFunctionType } from '@/assets/types';
import { Tooltip } from '@/components';

interface CreatePostFooterActionProps {
  active: boolean;
  image: imageType;
  onClick: voidFunctionType;
}

export const CreatePostFooterAction = ({
  active,
  image,
  onClick,
}: CreatePostFooterActionProps) => {
  const t = useTranslations('posts.create.actions');

  return (
    <Tooltip label={t(`${image.src}.desktop`)} position="-top-9">
      <button
        className={`duration-150 flex hover:bg-gray-200 items-center peer justify-center relative rounded-full size-9 transition dark:hover:bg-dark-200 ${
          active && 'bg-smoke-100 dark:bg-dark-400'
        }`}
        onClick={onClick}
        type="button"
      >
        <Image
          alt={image.alt}
          height={24}
          loading="eager"
          src={`/images/${image.src}-icon.png`}
          width={24}
        />
      </button>
    </Tooltip>
  );
};
