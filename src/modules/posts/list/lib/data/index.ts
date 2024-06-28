import { unstable_noStore } from 'next/cache';

import { db } from '@/lib/database';

export async function fetchPosts() {
  unstable_noStore();

  try {
    const data = await db.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return data;
  } catch (error) {
    throw new Error('failed-to-fetch-posts');
  }
}
