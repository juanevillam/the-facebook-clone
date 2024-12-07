import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

import { DynamicPageProps } from '@/assets/types';
import { StoryModalWrapper } from '@/modules/stories/story/components/story/modal';
import { fetchStory } from '@/modules/stories/story/services/storiesService';

const StoryModalPage = async ({ params: { id, locale } }: DynamicPageProps) => {
  unstable_setRequestLocale(locale);

  const story = await fetchStory(id);

  if (!story) notFound();

  return <StoryModalWrapper story={story} />;
};

export default StoryModalPage;
