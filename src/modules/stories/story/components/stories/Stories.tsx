import { StoryExtended } from '@/modules/posts/post/types';
import { CreateStoryCard } from '@/modules/stories/create/components';

import { StoryCard } from '../story';

type StoriesProps = {
  stories: StoryExtended[];
};

export const Stories = ({ stories }: StoriesProps) => {
  return stories.length > 0 ? (
    <section
      className="bg-card flex h-56 space-x-2.5 overflow-x-auto px-3 py-2.5 transition-colors duration-200 md:h-52 md:space-x-3 md:bg-transparent md:p-0"
      role="list"
    >
      <CreateStoryCard role="listitem" variant="list" />
      {stories.map((story) => (
        <StoryCard key={story.id} {...story} />
      ))}
    </section>
  ) : (
    <CreateStoryCard />
  );
};
