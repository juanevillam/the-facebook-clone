import { ChangeEvent, useState, useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_LAYOUT_PATH } from '@/modules/posts/create/assets/translations';
import { setThoughts } from '@/modules/posts/create/reducers/postSlice';

export const CreatePostTextArea = () => {
  const t = useTranslations(POSTS_CREATE_LAYOUT_PATH);
  const dispatch = useAppDispatch();
  const { thoughts } = useAppSelector((store) => store.posts.create.post);
  const [localThoughts, setLocalThoughts] = useState(thoughts);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setThoughts(localThoughts));
    }, 300);

    return () => clearTimeout(handler);
  }, [localThoughts, dispatch]);

  const handleSetThoughts = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setLocalThoughts(event.target.value);

  return (
    <textarea
      aria-label={t('thoughts')}
      className="bg-transparent focus:outline-none h-full placeholder:text-gray-500 pb-2 px-4 resize-none text-xl w-full dark:placeholder:text-gray-400 dark:text-gray-200 md:h-40 md:text-2xl md:pb-0"
      onChange={handleSetThoughts}
      placeholder={t('thoughts')}
      value={localThoughts}
    />
  );
};
