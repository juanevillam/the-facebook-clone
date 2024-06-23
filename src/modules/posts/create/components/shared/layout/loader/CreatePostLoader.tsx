import { Backdrop } from '@mui/material';
import { useTranslations } from 'next-intl';
import { MoonLoader } from 'react-spinners';

import { useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_LAYOUT_PATH } from '@/modules/posts/create/assets/translations';

export const CreatePostLoader = () => {
  const t = useTranslations(POSTS_CREATE_LAYOUT_PATH);
  const { posting } = useAppSelector((store) => store.posts.create.post);

  return (
    <Backdrop className="flex-col" open={posting}>
      <MoonLoader className="mb-1" color="#FFFFFF" size={28} />
      <h1 className="text-white text-xl">{t('loader')}</h1>
    </Backdrop>
  );
};
