import { useTranslations } from 'next-intl';

import { StoryCardSkeleton } from '../story';

export const StoriesSkeleton = () => {
  const t = useTranslations('stories');

  return (
    <div
      aria-label={t('loading')}
      className="bg-card flex h-56 space-x-2.5 overflow-x-auto px-3 py-2.5 transition-colors duration-200 md:h-52 md:space-x-3 md:bg-transparent md:p-0"
      role="list"
    >
      {[...Array(3)].map((_, index) => (
        <StoryCardSkeleton key={index} />
      ))}
    </div>
  );
};
