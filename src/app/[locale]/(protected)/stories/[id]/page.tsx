import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

import { StoryPageWrapper } from '@/modules/stories/story/components/story/page';
import { fetchStory } from '@/modules/stories/story/services/storiesService';

type StoryPageProps = {
  params: {
    id: string;
    locale: string;
  };
};

const StoryPage = async ({ params: { id, locale } }: StoryPageProps) => {
  unstable_setRequestLocale(locale);

  const story = await fetchStory(id);

  if (!story) notFound();

  return <StoryPageWrapper story={story} />;
};

export default StoryPage;
