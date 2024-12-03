'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { VideoPlayer } from '@/components';
import { Link } from '@/navigation';

type PostBodyProps = {
  media: string;
  mediaType: string;
  postId: string;
  thoughts: string;
};

export const PostBody = ({
  media,
  mediaType,
  postId,
  thoughts,
}: PostBodyProps) => {
  const t = useTranslations('images');

  return (
    <>
      {thoughts && (
        <p
          className={classNames('primary-text mb-2 pl-3', {
            'text-2xl': !media,
          })}
        >
          {thoughts}
        </p>
      )}
      {media && (
        <div className="bg-black">
          {mediaType === 'image' && (
            <Link href={`/posts/${postId}` as any}>
              <Image
                alt={t('user-image')}
                className="max-h-[600px] w-full object-contain"
                height={0}
                priority
                sizes="100vw"
                src={media as string}
                width={0}
              />
            </Link>
          )}
          {mediaType === 'gif' && (
            <Link href={`/posts/${postId}` as any}>
              <Image
                alt={t('user-gif')}
                className="max-h-[600px] w-full object-contain"
                height={0}
                priority
                sizes="100vw"
                src={media as string}
                unoptimized
                width={0}
              />
            </Link>
          )}
          {mediaType === 'video' && (
            <VideoPlayer showFullHeight={false} url={media} />
          )}
        </div>
      )}
    </>
  );
};
