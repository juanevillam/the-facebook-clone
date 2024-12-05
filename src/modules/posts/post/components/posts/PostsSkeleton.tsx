import { useTranslations } from 'next-intl';

import { PostSkeleton } from '../post/layout/shared';

export const PostsSkeleton = () => {
  const t = useTranslations('posts');

  return (
    <div
      aria-label={t('loading')}
      className="space-y-1.5 md:space-y-4"
      role="list"
    >
      {[...Array(5)].map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
};
