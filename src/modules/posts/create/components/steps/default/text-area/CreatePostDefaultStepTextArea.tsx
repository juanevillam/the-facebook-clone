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
        'primary-placeholder primary-text bg-transparent font-light md:font-normal pb-1.5 md:pb-0 px-3 md:px-4 resize-none size-full text-2xl focus:outline-none',
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
