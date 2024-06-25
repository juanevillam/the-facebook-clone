import { useTranslations } from 'next-intl';

import { Button } from '@/components/buttons';
import { useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_LAYOUT_PATH } from '@/modules/posts/create/assets/translations';

export const CreatePostButton = () => {
  const t = useTranslations(POSTS_CREATE_LAYOUT_PATH);
  const { thoughts } = useAppSelector((store) => store.posts.create.post);
  const { file } = useAppSelector((store) => store.posts.create.media);
  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);

  return (
    <Button
      className="md:pb-4 md:px-4"
      disabled={!thoughts && !file && !activeGif}
      fullWidth
      label={t('button')}
      onClick={() => {}}
      size="xs"
      type="button"
      variant="tertiary"
    />
  );
};
