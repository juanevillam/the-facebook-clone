import { useTranslations } from 'next-intl';

import { MediaType } from '@/assets/types';
import { PhotoIcon } from '@/assets/ui/icons';
import { MediaPicker } from '@/components';
import { useMedia } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setMedia } from '@/modules/posts/create/reducers/mediaSlice';
import { setStep } from '@/modules/posts/create/reducers/postSlice';

import { CreatePostStepMessage } from '../ui';

export const CreatePostMediaStep = () => {
  const t = useTranslations('posts.create');
  const dispatch = useAppDispatch();
  const { file, type } = useAppSelector((store) => store.posts.create.media);

  const onChangeMedia = (file: string, type: MediaType) =>
    dispatch(setMedia({ file, type }));

  const removeMedia = () => {
    dispatch(setMedia({ file: null, type: null }));
    dispatch(setStep('default'));
  };

  const { fileInputRef, handleFileChange, triggerFileInput } = useMedia(
    onChangeMedia,
    type
  );

  return (
    <MediaPicker
      className="md:primary-border md:m-3 md:h-96 md:rounded-lg md:border"
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
