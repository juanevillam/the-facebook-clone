import { useTranslations } from 'next-intl';

import { VoidFunction } from '@/assets/types';
import { SharedSvgProps } from '@/assets/ui/icons/types';

interface PostOptionsBottomSheetItemProps {
  IconComponent: React.FC<SharedSvgProps>;
  name: 'delete' | 'save' | 'edit' | 'unsave';
  onClick: VoidFunction;
  showDescription?: boolean;
}

export const PostOptionsBottomSheetItem = ({
  IconComponent,
  name,
  onClick,
  showDescription,
}: PostOptionsBottomSheetItemProps) => {
  const t = useTranslations('posts.post.options');

  return (
    <button
      className="flex flex-col items-start p-2 primary-transition px-3 md:px-2 w-full md:rounded-md hover:primary-bg"
      onClick={onClick}
      type="button"
    >
      <div className="flex-center space-x-2">
        <IconComponent className="primary-fill size-5" />
        <span className="font-medium primary-text">{t(`${name}.label`)}</span>
      </div>
      {showDescription && (
        <p className="accent-text md:secondary-text ml-7 text-left text-sm">
          {t(`${name}.description`)}
        </p>
      )}
    </button>
  );
};
