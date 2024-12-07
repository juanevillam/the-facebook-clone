'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/database/prismaClient';

export const deleteComment = async (commentId: string, userId: string) => {
  const session = await auth();

  if (!session) throw new Error('unauthorized');

  const comment = await db.comment.findUnique({
    where: {
      id: commentId,
      userId,
    },
  });

  if (!comment) throw new Error('comment-not-found');

  try {
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });

    revalidatePath('/');
    return { message: 'comment-deleted', type: 'success' };
  } catch (error) {
    throw new Error('failed-to-delete-comment');
  }
};
