'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/database/prismaClient';

export const commentPost = async (
  postId: string,
  thoughts: string,
  userId: string
) => {
  const session = await auth();

  if (!session) throw new Error('unauthorized');

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

    revalidatePath('/');
    return { message: 'comment-created', type: 'success' };
  } catch (error) {
    throw new Error('failed-to-post-comment');
  }
};
