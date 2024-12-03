'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/database/prismaClient';

export const savePost = async (postId: string, userId: string) => {
  const session = await auth();

  if (!session) throw new Error('unauthorized');

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

      revalidatePath('/');
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

    revalidatePath('/');
    return { message: 'post-saved', type: 'success' };
  } catch (error) {
    throw new Error('failed-to-save-post');
  }
};
