import { unstable_noStore } from 'next/cache';

import { db } from '@/lib/database';

export const fetchPost = async (postId: string) => {
  unstable_noStore();

  try {
    const data = await db.post.findUnique({
      where: {
        id: postId,
      },
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
    });

    return data;
  } catch (error) {
    throw new Error('failed-to-fetch-post');
  }
};
