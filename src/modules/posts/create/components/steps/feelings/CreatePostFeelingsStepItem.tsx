import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Feeling } from '@/modules/posts/create/types';

import { CreatePostStepItem } from '../ui';

type CreatePostFeelingsStepItemProps = {
  active: boolean;
  isEven?: boolean;
  item: Feeling;
  onClick: (item: Feeling) => void;
};

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
      <div className="flex-align-center space-x-2">
        <div className="md:bg-primary relative rounded-full transition-colors duration-200 md:p-2">
          <Image
            alt={t(item)}
            className="size-8 transition-transform duration-200 hover:scale-105 md:size-5"
            height={168}
            loading="eager"
            src={`/images/feelings/${item}-icon.png`}
            quality={100}
            width={168}
          />
        </div>
        <span className="text-primary transition-colors duration-200">
          {t(item)}
        </span>
      </div>
    </CreatePostStepItem>
  );
};
