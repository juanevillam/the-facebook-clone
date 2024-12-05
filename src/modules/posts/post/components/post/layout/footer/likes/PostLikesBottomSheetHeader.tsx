import { useTranslations } from 'next-intl';
import { Drawer } from 'vaul';

import { ArrowLeftIcon } from '@/assets/icons';
import { IconButton } from '@/components/buttons';

export const PostLikesBottomSheetHeader = () => {
  const t = useTranslations('posts.post.likes.bottom-sheet');

  return (
    <header
      aria-labelledby="post-likes-bottom-sheet-title"
      className="flex-center primary-border space-x-1.5 border-b p-1.5"
    >
      <Drawer.Close asChild>
        <IconButton
          className="hover:secondary-bg size-10"
          icon={{
            ariaLabel: 'close-post-likes-menu',
            className: 'stroke-[2.5] primary-stroke size-full',
            Component: ArrowLeftIcon,
          }}
        />
      </Drawer.Close>
      <h1
        className="primary-text text-xl font-medium"
        id="post-likes-bottom-sheet-title"
      >
        {t('title')}
      </h1>
    </header>
  );
};
