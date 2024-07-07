'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/database';

export const likePost = async (postId: string, userId: string) => {
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

      revalidatePath('/home');
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

    revalidatePath('/home');
    return { message: 'post-liked', type: 'success' };
  } catch (error) {
    throw new Error('failed-to-like-post');
  }
};
