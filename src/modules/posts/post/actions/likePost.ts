'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/database';

export const likePost = async (postId: string, userId: string) => {
  const session = await auth();

  if (!session) throw new Error('unauthorized');

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) throw new Error('post-not-found');

  const like = await db.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });

  if (like) {
    try {
      await db.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      revalidatePath('/');
      return { message: 'post-unliked', type: 'success' };
    } catch (error) {
      throw new Error('failed-to-unlike-post');
    }
  }

  try {
    await db.like.create({
      data: {
        postId,
        userId,
      },
    });

    revalidatePath('/');
    return { message: 'post-liked', type: 'success' };
  } catch (error) {
    throw new Error('failed-to-like-post');
  }
};
