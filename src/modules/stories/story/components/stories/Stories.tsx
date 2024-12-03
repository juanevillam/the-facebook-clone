import { CreateStoryCard } from '@/modules/stories/create/components';

import { fetchStories } from '../../data';
import { StoryCard } from '../story';

export const Stories = async () => {
  const stories = await fetchStories();

  return stories.length > 0 ? (
    <div className="card-bg flex h-56 space-x-2.5 overflow-x-auto px-3 py-2.5 md:h-52 md:space-x-3 md:bg-transparent md:p-0">
      <CreateStoryCard variant="list" />
      {stories.map((story) => (
        <StoryCard key={story.id} {...story} />
      ))}
    </div>
  ) : (
    <CreateStoryCard />
  );
};
