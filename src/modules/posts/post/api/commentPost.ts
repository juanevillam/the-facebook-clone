'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/database';

export const commentPost = async (
  postId: string,
  thoughts: string,
  userId: string
) => {
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) throw new Error('post-not-found');

  try {
    await db.comment.create({
      data: {
        postId,
        thoughts,
        userId,
      },
    });

    revalidatePath('/home');
    return { message: 'comment-created', type: 'success' };
  } catch (error) {
    throw new Error('failed-to-post-comment');
  }
};
