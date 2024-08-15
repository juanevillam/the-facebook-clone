import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setThoughts } from '@/modules/posts/create/reducers/postSlice';

export const CreatePostDefaultStepTextArea = () => {
  const t = useTranslations('posts.create.layout');
  const dispatch = useAppDispatch();
  const { thoughts } = useAppSelector((store) => store.posts.create.post);
  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);

  const handleSetThoughts = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(setThoughts(event.target.value));

  return (
    <textarea
      aria-label={t('thoughts')}
      className={classNames(
        'primary-placeholder primary-text size-full resize-none bg-transparent px-3 pb-1.5 text-2xl font-light focus:outline-none md:px-4 md:pb-0 md:font-normal',
        {
          'md:h-30': activeGif,
          'md:h-40': !activeGif,
        }
      )}
      onChange={handleSetThoughts}
      placeholder={t('thoughts')}
      value={thoughts}
    />
  );
};
