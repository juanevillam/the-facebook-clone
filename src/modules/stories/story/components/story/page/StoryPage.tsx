'use client';

import { StoryExtended } from '@/modules/posts/post/assets/types';

import { StoryContent } from '../shared';

type StoryPageProps = {
  story: StoryExtended;
};

export const StoryPage = ({ story }: StoryPageProps) => {
  return (
    <div className="h-screen md:h-[calc(100vh-57px)]">
      <StoryContent story={story} variant="page" />
    </div>
  );
};
