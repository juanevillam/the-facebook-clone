import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

import { DynamicPageProps } from '@/assets/types';
import { StoryPageWrapper } from '@/modules/stories/story/components/story/page';
import { fetchStory } from '@/modules/stories/story/services/storiesService';

const StoryPage = async ({ params: { id, locale } }: DynamicPageProps) => {
  unstable_setRequestLocale(locale);

  const story = await fetchStory(id);

  if (!story) notFound();

  return <StoryPageWrapper story={story} />;
};

export default StoryPage;
