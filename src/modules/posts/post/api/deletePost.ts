'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/database';

export const deletePost = async (postId: string, userId: string) => {
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

    revalidatePath('/home');
    return { message: 'post-deleted', type: 'success' };
  } catch (error) {
    throw new Error('failed-to-delete-post');
  }
};