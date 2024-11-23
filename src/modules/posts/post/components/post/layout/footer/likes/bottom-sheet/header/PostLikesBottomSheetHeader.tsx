import { useTranslations } from 'next-intl';
import { Drawer } from 'vaul';

import { ArrowLeftIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';

export const PostLikesBottomSheetHeader = () => {
  const t = useTranslations('posts.post.likes.bottom-sheet');

  return (
    <div className="flex-center primary-border space-x-1.5 border-b p-1.5">
      <Drawer.Close asChild>
        <IconButton
          className="hover:secondary-bg size-10"
          icon={{
            className: 'stroke-[2.5] primary-stroke size-full',
            Component: ArrowLeftIcon,
            name: 'back',
          }}
        />
      </Drawer.Close>
      <h1 className="primary-text text-xl font-medium">{t('title')}</h1>
    </div>
  );
};
