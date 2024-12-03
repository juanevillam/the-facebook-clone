'use client';

import { StoryExtended } from '@/modules/posts/post/types';

import { StoryContent } from '../StoryContent';

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
