'use server';

import { auth } from '@/auth';
import { db } from '@/lib/database';

export const markStoryItemAsViewed = async (storyItemId: string) => {
  const session = await auth();

  if (!session) throw new Error('unauthorized');

  const userId = session?.user?.id;

  try {
    const existingView = await db.storyItemView.findFirst({
      where: {
        storyItemId,
        userId,
      },
    });

    if (!existingView) {
      await db.storyItemView.create({
        data: {
          storyItem: {
            connect: { id: storyItemId },
          },
          user: {
            connect: { id: userId },
          },
        },
      });
    }
  } catch (error) {
    throw new Error('failed-to-mark-story-as-viewed');
  }
};
