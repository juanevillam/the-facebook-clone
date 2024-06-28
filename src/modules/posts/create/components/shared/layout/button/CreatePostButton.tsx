import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { Button } from '@/components/buttons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { createPost } from '@/modules/posts/create/api/createPost';
import { POSTS_CREATE_LAYOUT_PATH } from '@/modules/posts/create/assets/translations';
import { setActiveLocation } from '@/modules/posts/create/reducers/checkInSlice';
import { setActiveFeeling } from '@/modules/posts/create/reducers/feelingsSlice';
import { setActiveGif } from '@/modules/posts/create/reducers/gifsSlice';
import { setMedia } from '@/modules/posts/create/reducers/mediaSlice';
import {
  setThoughts,
  toggleOpenable,
  togglePosting,
} from '@/modules/posts/create/reducers/postSlice';

export const CreatePostButton = () => {
  const t = useTranslations('');
  const dispatch = useAppDispatch();
  const { posting, thoughts } = useAppSelector(
    (store) => store.posts.create.post
  );

  const media = useAppSelector((store) => store.posts.create.media);
  const { activeFeeling } = useAppSelector(
    (store) => store.posts.create.feelings
  );

  const { activeLocation } = useAppSelector(
    (store) => store.posts.create.checkIn
  );

  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);

  const handleCreatePost = () => {
    dispatch(togglePosting());

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
        dispatch(toggleOpenable());
        dispatch(setThoughts(''));
        dispatch(setMedia({ file: null, playing: false, type: null }));
        dispatch(setActiveFeeling(null));
        dispatch(setActiveLocation(null));
        dispatch(setActiveGif(null));
        dispatch(togglePosting());
      })
      .catch(() => {
        showToast.error(t('toast-messages.error.something-went-wrong'));
        dispatch(togglePosting());
      });
  };

  return (
    <Button
      className="md:pb-4 md:px-4"
      disabled={(!thoughts && !media.file && !activeGif) || posting}
      fullWidth
      label={t(`${POSTS_CREATE_LAYOUT_PATH}.button`)}
      onClick={handleCreatePost}
      size="xs"
      type="button"
      variant="tertiary"
    />
  );
};
