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
      className="hover:bg-primary flex-align-center group w-full space-x-2 p-2 px-3 transition-colors duration-200 ease-in-out md:rounded-md md:px-2"
      onClick={onClick}
      type="button"
    >
      <IconComponent
        ariaHidden="true"
        className="fill-primary size-5 transition-transform duration-200 ease-in-out group-hover:scale-110"
      />
      <span className="text-primary font-medium transition-colors duration-200">
        {t(`${name}.label`)}
      </span>
    </button>
  );
};
