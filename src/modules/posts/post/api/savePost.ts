'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/database';

export const savePost = async (postId: string, userId: string) => {
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) throw new Error('post-not-found');

  const save = await db.savedPost.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });

  if (save) {
    try {
      await db.savedPost.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      revalidatePath('/home');
      return { message: 'post-unsaved', type: 'success' };
    } catch (error) {
      throw new Error('failed-to-unsave-post');
    }
  }

  try {
    await db.savedPost.create({
      data: {
        postId,
        userId,
      },
    });

    revalidatePath('/home');
    return { message: 'post-saved', type: 'success' };
  } catch (error) {
    throw new Error('failed-to-save-post');
  }
};
