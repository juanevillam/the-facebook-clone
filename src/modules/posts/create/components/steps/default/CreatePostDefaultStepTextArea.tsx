import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setCreatePostThoughts } from '@/modules/posts/create/reducers/createPostPostReducer';

export const CreatePostDefaultStepTextArea = () => {
  const t = useTranslations('posts.create.layout');
  const dispatch = useAppDispatch();
  const { thoughts } = useAppSelector(
    (store) => store.posts.createPost.createPostPost
  );

  const { activeGif } = useAppSelector(
    (store) => store.posts.createPost.createPostGifsStep
  );

  const handleSetThoughts = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(setCreatePostThoughts(event.target.value));

  return (
    <textarea
      aria-label={t('thoughts')}
      className={classNames(
        'placeholder-primary text-primary size-full resize-none bg-transparent px-3 pb-1.5 text-2xl font-light focus:outline-none md:px-4 md:pb-0 md:font-normal',
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
