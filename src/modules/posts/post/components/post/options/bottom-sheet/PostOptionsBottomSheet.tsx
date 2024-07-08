import { useTranslations } from 'next-intl';
import { Drawer } from 'vaul';

import { VoidFunction } from '@/assets/types';

interface PostOptionsBottomSheetProps {
  onDismiss: VoidFunction;
  children: React.ReactNode;
}

export const PostOptionsBottomSheet = ({
  onDismiss,
  children,
}: PostOptionsBottomSheetProps) => {
  const t = useTranslations('posts.post.options.bottom-sheet');

  return (
    <Drawer.Portal>
      <Drawer.Overlay className="bottom-sheet-overlay" onClick={onDismiss} />
      <Drawer.Content className="bottom-sheet-content">
        <Drawer.Handle className="bottom-sheet-handle" />
        <Drawer.Title className="sr-only">{t('title')}</Drawer.Title>
        <Drawer.Description className="sr-only">
          {t('description')}
        </Drawer.Description>
        <div className="py-1.5 rounded-lg">{children}</div>
      </Drawer.Content>
      <Drawer.Overlay />
    </Drawer.Portal>
  );
};
