import { unstable_noStore } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/database';

export const fetchStories = async () => {
  unstable_noStore();

  const now = new Date();
  const session = await auth();

  if (!session) throw new Error('unauthorized');

  try {
    const data = await db.story.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return data.filter((story) => story.items.length > 0);
  } catch (error) {
    throw new Error('failed-to-fetch-stories');
  }
};
