import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { Button } from '@/components/buttons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { createPost } from '@/modules/posts/create/actions';
import { setCreatePostCheckInStepActiveLocation } from '@/modules/posts/create/reducers/steps/createPostCheckInStepReducer';
import { setCreatePostFeelingsStepActiveFeeling } from '@/modules/posts/create/reducers/steps/createPostFeelingsStepReducer';
import {
  setCreatePostGifsStepActiveGif,
  setCreatePostGifsStepGifs,
  setCreatePostGifsStepSearchInputValue,
} from '@/modules/posts/create/reducers/steps/createPostGifsStepReducer';
import { setCreatePostMediaStepMedia } from '@/modules/posts/create/reducers/steps/createPostMediaStepReducer';
import {
  setCreatePostThoughts,
  toggleCreatePostOpenable,
  toggleCreatePostPosting,
} from '@/modules/posts/create/reducers/steps/createPostPostReducer';

export const CreatePostDefaultStepButton = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { posting, thoughts } = useAppSelector(
    (store) => store.posts.createPost.createPostPost
  );

  const media = useAppSelector(
    (store) => store.posts.createPost.createPostMediaStep
  );

  const { activeFeeling } = useAppSelector(
    (store) => store.posts.createPost.createPostFeelingsStep
  );

  const { activeLocation } = useAppSelector(
    (store) => store.posts.createPost.createPostCheckInStep
  );

  const { activeGif } = useAppSelector(
    (store) => store.posts.createPost.createPostGifsStep
  );

  const handleCreatePost = () => {
    dispatch(toggleCreatePostPosting());

    createPost({
      thoughts: thoughts.length > 0 ? thoughts : null,
      media: {
        file: media.file,
        type: media.type,
      },
      feeling: activeFeeling,
      location: activeLocation?.structured_formatting.main_text,
      gif: activeGif?.url,
    })
      .then((data) => {
        showToast.success(t(`toast-messages.success.${data.message}`));
        dispatch(toggleCreatePostOpenable());
        dispatch(setCreatePostThoughts(''));
        dispatch(setCreatePostMediaStepMedia({ file: null, type: null }));
        dispatch(setCreatePostFeelingsStepActiveFeeling(null));
        dispatch(setCreatePostCheckInStepActiveLocation(null));
        dispatch(setCreatePostGifsStepActiveGif(null));
        dispatch(setCreatePostGifsStepSearchInputValue(''));
        dispatch(setCreatePostGifsStepGifs({ gifs: [], error: false }));
        dispatch(toggleCreatePostPosting());
      })
      .catch(({ message }) => {
        showToast.error(t(`toast-messages.error.${message}`));
        dispatch(toggleCreatePostPosting());
      });
  };

  return (
    <Button
      disabled={(!thoughts && !media.file && !activeGif) || posting}
      fullWidth
      label={t('posts.create.steps.default.button')}
      onClick={handleCreatePost}
      size="xs"
      type="button"
      variant="tertiary"
    />
  );
};
