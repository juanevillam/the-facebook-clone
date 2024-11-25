import { StoryCardSkeleton } from '../story';

export const StoriesSkeleton = () => {
  return (
    <div className="card-bg flex h-56 space-x-2.5 overflow-x-auto px-3 py-2.5 md:h-52 md:space-x-3 md:bg-transparent md:p-0">
      {[...Array(5)].map((_, index) => (
        <StoryCardSkeleton key={index} />
      ))}
    </div>
  );
};
