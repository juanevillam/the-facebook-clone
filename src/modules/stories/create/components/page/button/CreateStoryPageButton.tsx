import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { Button } from '@/components/buttons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useRouter } from '@/navigation';

import { createStory } from '../../../actions';
import { setCreateStoryMedia } from '../../../reducers/createStoryMediaSlice';
import { toggleCreateStoryPosting } from '../../../reducers/createStoryStorySlice';

export const CreateStoryPageButton = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { posting } = useAppSelector(
    (store) => store.stories.createStory.createStoriesStory
  );

  const { file, type } = useAppSelector(
    (store) => store.stories.createStory.createStoriesMedia
  );

  const router = useRouter();

  const handleCreateStory = () => {
    dispatch(toggleCreateStoryPosting());

    createStory({
      media: {
        file,
        type,
      },
    })
      .then((data) => {
        showToast.success(t(`toast-messages.success.${data.message}`));
        dispatch(setCreateStoryMedia({ file: null, type: null }));
        dispatch(toggleCreateStoryPosting());
        router.push('/');
      })
      .catch(({ message }) => {
        showToast.error(t(`toast-messages.error.${message}`));
        dispatch(toggleCreateStoryPosting());
      });
  };

  return (
    <Button
      disabled={posting}
      fullWidth
      label={t('stories.create.page.button')}
      onClick={handleCreateStory}
      size="xs"
      type="button"
      variant="tertiary"
    />
  );
};
