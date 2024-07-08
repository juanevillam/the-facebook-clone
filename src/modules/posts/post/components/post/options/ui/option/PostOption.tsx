import { useTranslations } from 'next-intl';

import { SharedSvgProps } from '@/assets/ui/icons/types';

export type postOption = {
  IconComponent: React.FC<SharedSvgProps>;
  name: 'delete' | 'save' | 'edit';
  showDescription?: boolean;
};

export const PostOption = ({
  IconComponent,
  name,
  showDescription,
}: postOption) => {
  const t = useTranslations('posts.post.options');

  return (
    <button
      className="flex flex-col items-start p-2 primary-transition px-3 md:px-2 w-full md:rounded-md hover:secondary-bg md:hover:primary-bg"
      type="submit"
    >
      <div className="flex-center space-x-2">
        <IconComponent className="primary-fill size-6 md:size-5" />
        <span className="font-medium primary-text">{t(`${name}.label`)}</span>
      </div>
      {showDescription && (
        <p className="accent-text md:secondary-text ml-8 md:ml-7 text-sm">
          {t(`${name}.description`)}
        </p>
      )}
    </button>
  );
};
