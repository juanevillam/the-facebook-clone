import { unstable_noStore } from 'next/cache';

import { db } from '@/lib/database';

export const fetchStory = async (storyId: string) => {
  unstable_noStore();

  const now = new Date();

  try {
    const data = await db.story.findUnique({
      where: {
        id: storyId,
      },
      include: {
        user: true,
        items: {
          where: {
            expiresAt: {
              gt: now,
            },
          },
          include: {
            views: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return data?.items && data.items.length > 0 ? data : null;
  } catch (error) {
    throw new Error('failed-to-fetch-story');
  }
};
