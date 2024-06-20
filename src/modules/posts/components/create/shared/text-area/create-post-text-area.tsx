import { ChangeEvent } from 'react';

import { useTranslations } from 'next-intl';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setThoughts } from '@/lib/store/reducers/posts-reducer';

export const CreatePostTextArea = () => {
  const t = useTranslations('posts.create');
  const dispatch = useAppDispatch();
  const { thoughts } = useAppSelector((store) => store.postsReducer);

  const handleSetThoughts = (event: ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(setThoughts(event.target.value));

  return (
    <textarea
      className="bg-transparent focus:outline-none h-full placeholder:text-gray-500 pb-2 px-4 resize-none text-xl w-full md:h-40 md:text-2xl md:pb-0 dark:placeholder:text-gray-400 dark:text-gray-200"
      onChange={handleSetThoughts}
      placeholder={t('thoughts-placeholder')}
      value={thoughts}
    />
  );
};
