import { useTranslations } from 'next-intl';

import { SharedSvgProps } from '@/assets/icons/types';

type PostOptionsBottomSheetItemProps = {
  IconComponent: React.FC<SharedSvgProps>;
  name: 'delete' | 'save' | 'unsave' | 'view';
  onClick: VoidFunction;
  showDescription?: boolean;
};

export const PostOptionsBottomSheetItem = ({
  IconComponent,
  name,
  onClick,
  showDescription,
}: PostOptionsBottomSheetItemProps) => {
  const t = useTranslations('posts.post.options');

  return (
    <button
      aria-label={t(`${name}.label`)}
      className="primary-transition hover:primary-bg flex w-full flex-col items-start p-2 px-3 md:rounded-md md:px-2"
      onClick={onClick}
      type="button"
    >
      <div className="flex-center space-x-2">
        <IconComponent className="primary-fill size-5" />
        <span className="primary-text font-medium">{t(`${name}.label`)}</span>
      </div>
      {showDescription && (
        <p className="accent-text md:secondary-text ml-7 text-left text-sm">
          {t(`${name}.description`)}
        </p>
      )}
    </button>
  );
};
