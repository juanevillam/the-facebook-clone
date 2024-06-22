import { ChangeEvent, useState, useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setThoughts } from '@/modules/posts/create/reducers/postSlice';

export const CreatePostTextArea = () => {
  const t = useTranslations('posts.create');
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
      aria-label={t('thoughts-placeholder')}
      className="bg-transparent focus:outline-none h-full placeholder:text-gray-500 pb-2 px-4 resize-none text-xl w-full dark:placeholder:text-gray-400 dark:text-gray-200 md:h-40 md:text-2xl md:pb-0"
      onChange={handleSetThoughts}
      placeholder={t('thoughts-placeholder')}
      value={localThoughts}
    />
  );
};
