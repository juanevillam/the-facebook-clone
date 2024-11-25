import { unstable_noStore } from 'next/cache';

import { db } from '@/lib/database';

export const fetchStories = async () => {
  unstable_noStore();

  try {
    const data = await db.story.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return data;
  } catch (error) {
    throw new Error('failed-to-fetch-stories');
  }
};
