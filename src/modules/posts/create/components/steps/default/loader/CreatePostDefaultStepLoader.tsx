import { Backdrop } from '@mui/material';
import { useTranslations } from 'next-intl';
import { MoonLoader } from 'react-spinners';

import { useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_STEPS_DEFAULT_PATH } from '@/modules/posts/create/assets/translations';

export const CreatePostDefaultStepLoader = () => {
  const t = useTranslations(POSTS_CREATE_STEPS_DEFAULT_PATH);
  const { posting } = useAppSelector((store) => store.posts.create.post);

  return (
    <Backdrop className="flex-col" open={posting}>
      <MoonLoader className="mb-2" color="#F3F4F6" size={28} />
      <h1 className="main-text-dark text-xl">{t('loader')}</h1>
    </Backdrop>
  );
};
