import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { POSTS_CREATE_STEPS_FEELINGS_PATH } from '@/modules/posts/create/assets/translations';
import { Feeling } from '@/modules/posts/create/assets/types';

import { CreatePostStepItem } from '../../ui';

interface CreatePostFeelingsStepItemProps {
  active: boolean;
  isEven?: boolean;
  item: Feeling;
  onClick: (item: Feeling) => void;
}

export const CreatePostFeelingsStepItem = ({
  active,
  isEven,
  item,
  onClick,
}: CreatePostFeelingsStepItemProps) => {
  const t = useTranslations(`${POSTS_CREATE_STEPS_FEELINGS_PATH}.list`);

  const handleSelect = () => onClick(item);

  return (
    <CreatePostStepItem
      active={active}
      handleSelect={handleSelect}
      isEven={isEven}
    >
      <div className="flex-center space-x-2">
        <div className="md:main-bg main-transition relative rounded-full md:p-2">
          <Image
            alt={t(item)}
            className="size-8 md:size-5"
            height={168}
            loading="eager"
            src={`/images/feelings/${item}-icon.png`}
            quality={100}
            width={168}
          />
        </div>
        <span className="main-text">{t(item)}</span>
      </div>
    </CreatePostStepItem>
  );
};
