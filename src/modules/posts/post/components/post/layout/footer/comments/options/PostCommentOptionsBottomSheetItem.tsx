import { useTranslations } from 'next-intl';

import { SharedSvgProps } from '@/assets/icons/types';

type PostCommentOptionsBottomSheetItemProps = {
  IconComponent: React.FC<SharedSvgProps>;
  name: 'delete';
  onClick: VoidFunction;
};

export const PostCommentOptionsBottomSheetItem = ({
  IconComponent,
  name,
  onClick,
}: PostCommentOptionsBottomSheetItemProps) => {
  const t = useTranslations('posts.post.footer.comments.options');

  return (
    <button
      aria-label={t(`${name}.label`)}
      className="primary-transition hover:primary-bg flex w-full flex-col items-start p-2 px-3 md:rounded-md md:px-2"
      onClick={onClick}
      type="button"
    >
      <div className="flex-center space-x-2">
        <IconComponent ariaHidden="true" className="primary-fill size-5" />
        <span className="primary-text font-medium">{t(`${name}.label`)}</span>
      </div>
    </button>
  );
};
