'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/database';

export const deletePost = async (postId: string, userId: string) => {
  const session = await auth();

  if (!session) throw new Error('unauthorized');

  const post = await db.post.findUnique({
    where: {
      id: postId,
      userId,
    },
  });

  if (!post) throw new Error('post-not-found');

  try {
    await db.post.delete({
      where: {
        id: postId,
      },
    });

    revalidatePath('/');
    return { message: 'post-deleted', type: 'success' };
  } catch (error) {
    throw new Error('failed-to-delete-post');
  }
};
