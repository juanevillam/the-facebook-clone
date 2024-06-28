'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/database';

import { Feeling } from '../assets/types';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface createPostProps {
  thoughts: string | null;
  media: { file: string | null; type: string | null };
  feeling: Feeling | null;
  location: string | undefined;
  gif: string | undefined;
}

export const createPost = async ({
  thoughts,
  media,
  feeling,
  location,
  gif,
}: createPostProps) => {
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

  if (gif) {
    mediaUrl = gif;
    mediaType = 'gif';
  }

  try {
    await db.post.create({
      data: {
        thoughts,
        media: mediaUrl,
        mediaType,
        feeling,
        location,
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });

    revalidatePath('/home');

    return { message: 'post-created', type: 'success' };
  } catch (error) {
    return new Error('something-went-wrong');
  }
};
