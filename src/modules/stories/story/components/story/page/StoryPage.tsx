'use client';

import { StoryExtended } from '@/modules/posts/post/assets/types';
import { usePathname } from '@/navigation';

type StoryPageProps = {
  story: StoryExtended;
};

export const StoryPage = ({ story }: StoryPageProps) => {
  const path = usePathname();
  console.log(path);

  return <div className="card-bg md:h-[calc(100vh-57px)]">StoryPage</div>;
};
