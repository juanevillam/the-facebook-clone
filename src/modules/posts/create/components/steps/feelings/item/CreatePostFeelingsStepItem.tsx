import Image from 'next/image';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('posts.feelings');

  const handleSelect = () => onClick(item);

  return (
    <CreatePostStepItem
      active={active}
      handleSelect={handleSelect}
      isEven={isEven}
    >
      <div className="flex-center space-x-2">
        <div className="relative rounded-full md:p-2 md:primary-bg md:primary-transition">
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
        <span className="primary-text">{t(item)}</span>
      </div>
    </CreatePostStepItem>
  );
};
