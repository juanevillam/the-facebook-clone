'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { VideoPlayer } from '@/components';
import { Link } from '@/navigation';

import { PostExtended } from '../../../types';

type PostBodyProps = {
  post: PostExtended;
};

export const PostBody = ({
  post: { id, media, mediaType, thoughts, user },
}: PostBodyProps) => {
  const t = useTranslations('images');

  const renderMediaContent = () => {
    switch (mediaType) {
      case 'image':
        return (
          <Link href={`/posts/${id}` as any}>
            <Image
              alt={t('user-image', {
                user: user.name,
              })}
              className="max-h-[600px] w-full object-contain"
              height={0}
              priority
              sizes="100vw"
              src={media as string}
              width={0}
            />
          </Link>
        );
      case 'gif':
        return (
          <Link href={`/posts/${id}` as any}>
            <Image
              alt={t('user-gif', {
                user: user.name,
              })}
              className="max-h-[600px] w-full object-contain"
              height={0}
              priority
              sizes="100vw"
              src={media as string}
              unoptimized
              width={0}
            />
          </Link>
        );
      case 'video':
        return media && <VideoPlayer showFullHeight={false} url={media} />;
      default:
        return null;
    }
  };

  return (
    <>
      {thoughts && (
        <p
          className={classNames(
            'text-primary mb-2 pl-3 transition-colors duration-200',
            {
              'text-2xl': !media,
            }
          )}
        >
          {thoughts}
        </p>
      )}
      {media && <div className="bg-black">{renderMediaContent()}</div>}
    </>
  );
};
