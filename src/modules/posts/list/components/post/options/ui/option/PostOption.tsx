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
  const t = useTranslations('posts.post.header.options');

  return (
    <button
      className="main-transition flex flex-col items-start p-2 px-3 md:px-2 w-full md:rounded-md hover:main-bg-accent-hover"
      type="submit"
    >
      <div className="flex-center">
        <IconComponent className="main-fill mr-2 size-6 md:size-5" />
        <span className="main-text font-medium">{t(`${name}.label`)}</span>
      </div>
      {showDescription && (
        <p className="accent-text md:secondary-text ml-8 md:ml-7  text-sm">
          {t(`${name}.description`)}
        </p>
      )}
    </button>
  );
};
