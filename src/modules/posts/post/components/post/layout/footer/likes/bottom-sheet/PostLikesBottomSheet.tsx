import { useTranslations } from 'next-intl';
import { Drawer } from 'vaul';

import { LikeExtended } from '@/modules/posts/post/assets/types';

import { PostLikesBottomSheetBody } from './body/PostLikesBottomSheetBody';
import { PostLikesBottomSheetHeader } from './header/PostLikesBottomSheetHeader';

type PostLikesBottomSheetProps = {
  optimisticLikes: LikeExtended[];
};

export const PostLikesBottomSheet = ({
  optimisticLikes,
}: PostLikesBottomSheetProps) => {
  const t = useTranslations('posts.post.likes.bottom-sheet');

  return (
    <Drawer.Portal>
      <Drawer.Overlay className="bottom-sheet-overlay" />
      <Drawer.Content className="bottom-sheet-content h-full md:h-[576px]">
        <Drawer.Title className="sr-only">{t('title')}</Drawer.Title>
        <Drawer.Description className="sr-only">
          {t('description')}
        </Drawer.Description>
        <div className="flex h-full flex-col">
          <Drawer.Handle className="bottom-sheet-handle" />
          <PostLikesBottomSheetHeader />
          <PostLikesBottomSheetBody optimisticLikes={optimisticLikes} />
        </div>
      </Drawer.Content>
      <Drawer.Overlay />
    </Drawer.Portal>
  );
};
