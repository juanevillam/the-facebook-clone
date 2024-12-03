import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

import { StoryModalWrapper } from '@/modules/stories/story/components/story/modal';
import { fetchStory } from '@/modules/stories/story/data';

type StoryModalPageProps = {
  params: {
    id: string;
    locale: string;
  };
};

const StoryModalPage = async ({
  params: { id, locale },
}: StoryModalPageProps) => {
  unstable_setRequestLocale(locale);

  const story = await fetchStory(id);

  if (!story) notFound();

  return <StoryModalWrapper story={story} />;
};

export default StoryModalPage;
