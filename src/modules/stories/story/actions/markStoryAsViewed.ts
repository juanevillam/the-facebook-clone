'use server';

import { db } from '@/lib/database';

export const markStoryAsViewed = async (storyItemId: string) => {
  try {
    await db.storyItem.update({
      where: { id: storyItemId },
      data: { viewed: true },
    });
  } catch (error) {
    throw new Error('failed-to-mark-story-as-viewed');
  }
};
