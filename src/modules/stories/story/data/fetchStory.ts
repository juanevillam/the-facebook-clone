import { unstable_noStore } from 'next/cache';

import { db } from '@/lib/database';

export const fetchStory = async (storyId: string) => {
  unstable_noStore();

  try {
    const data = await db.story.findUnique({
      where: {
        id: storyId,
      },
      include: {
        user: true,
        items: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return data;
  } catch (error) {
    throw new Error('failed-to-fetch-story');
  }
};
