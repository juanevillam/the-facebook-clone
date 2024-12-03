'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

import { Media } from '@/assets/types';
import { auth } from '@/auth';
import { db } from '@/lib/database';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type createStoryProps = {
  media: Media;
};

export const createStory = async ({ media }: createStoryProps) => {
  const session = await auth();

  if (!session) throw new Error('unauthorized');

  let mediaUrl = null;
  let mediaType = null;

  if (media?.file) {
    const result = await cloudinary.uploader.upload(media.file, {
      resource_type: media.type as 'image' | 'video',
    });

    mediaUrl = result.secure_url;
    mediaType = media.type;
  }

  try {
    let story = await db.story.findFirst({
      where: { userId: session?.user?.id },
    });

    if (!story) {
      story = await db.story.create({
        data: {
          user: {
            connect: { id: session?.user?.id },
          },
        },
      });
    }

    await db.storyItem.create({
      data: {
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        media: mediaUrl as string,
        mediaType: mediaType as string,
        story: {
          connect: { id: story.id },
        },
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });

    revalidatePath('/');
    return { message: 'story-created', type: 'success' };
  } catch (error) {
    throw new Error('failed-to-create-story');
  }
};
