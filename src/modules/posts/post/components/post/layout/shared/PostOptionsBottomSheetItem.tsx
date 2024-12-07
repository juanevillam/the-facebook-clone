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
      className="hover:bg-primary group flex w-full flex-col items-start p-2 px-3 transition-colors duration-200 md:rounded-md md:px-2"
      onClick={onClick}
      type="button"
    >
      <div className="flex-align-center space-x-2">
        <IconComponent className="fill-primary size-5 transition-transform duration-200 ease-in-out group-hover:scale-110" />
        <span className="text-primary font-medium transition-colors duration-200">
          {t(`${name}.label`)}
        </span>
      </div>
      {showDescription && (
        <p className="text-accent md:text-secondary ml-7 text-left text-sm transition-colors duration-200">
          {t(`${name}.description`)}
        </p>
      )}
    </button>
  );
};
