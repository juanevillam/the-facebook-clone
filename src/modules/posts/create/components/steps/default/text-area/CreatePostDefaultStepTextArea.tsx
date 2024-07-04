import { ChangeEvent, useState, useEffect } from 'react';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_LAYOUT_PATH } from '@/modules/posts/create/assets/translations';
import { setThoughts } from '@/modules/posts/create/reducers/postSlice';

export const CreatePostDefaultStepTextArea = () => {
  const t = useTranslations(POSTS_CREATE_LAYOUT_PATH);
  const dispatch = useAppDispatch();
  const { thoughts } = useAppSelector((store) => store.posts.create.post);
  const [localThoughts, setLocalThoughts] = useState('');
  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);

  useEffect(() => {
    setLocalThoughts(thoughts);
  }, [thoughts]);

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
      className={classNames(
        'main-placeholder main-text bg-transparent font-light md:font-normal pb-1.5 md:pb-0 px-3 md:px-4 resize-none size-full text-2xl focus:outline-none',
        {
          'md:h-30': activeGif,
          'md:h-40': !activeGif,
        }
      )}
      onChange={handleSetThoughts}
      placeholder={t('thoughts')}
      value={localThoughts}
    />
  );
};
