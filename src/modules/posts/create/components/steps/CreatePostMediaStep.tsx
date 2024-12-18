import { useTranslations } from 'next-intl';

import { PhotoIcon } from '@/assets/icons';
import { MediaType } from '@/assets/types';
import { MediaPicker } from '@/components';
import { useMedia } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { CreatePostStepMessage } from './ui';
import { setCreatePostStep } from '../../reducers/createPostPostReducer';
import { setCreatePostMediaStepMedia } from '../../reducers/steps/createPostMediaStepReducer';

export const CreatePostMediaStep = () => {
  const t = useTranslations('posts.create');
  const dispatch = useAppDispatch();
  const { file, type } = useAppSelector(
    (store) => store.posts.createPost.createPostMediaStep
  );

  const onChangeMedia = (file: string, type: MediaType) =>
    dispatch(setCreatePostMediaStepMedia({ file, type }));

  const removeMedia = () => {
    dispatch(setCreatePostMediaStepMedia({ file: null, type: null }));
    dispatch(setCreatePostStep('default'));
  };

  const { fileInputRef, handleFileChange, triggerFileInput } = useMedia(
    onChangeMedia,
    type
  );

  return (
    <MediaPicker
      className="md:border-primary md:m-3 md:h-96 md:rounded-lg md:border"
      file={file}
      fileInputRef={fileInputRef}
      NoMediaComponent={
        <CreatePostStepMessage Icon={PhotoIcon} message={t('steps.media')} />
      }
      onFileChange={handleFileChange}
      onRemove={removeMedia}
      triggerFileInput={triggerFileInput}
      type={type}
    />
  );
};
