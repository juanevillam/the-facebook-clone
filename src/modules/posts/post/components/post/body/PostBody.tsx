'use client';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import ReactPlayer from 'react-player';

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
  return (
    <>
      <p
        className={classNames('primary-text mb-1.5 pl-3', {
          'text-2xl': !media,
        })}
      >
        {thoughts}
      </p>
      {media && (
        <div className="bg-black">
          {mediaType === 'image' && (
            <Link href={`/posts/${postId}`}>
              <Image
                alt="Image"
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
            <Link href={`/posts/${postId}`}>
              <Image
                alt="GIF"
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
            <ReactPlayer controls loop url={media} width="100%" />
          )}
        </div>
      )}
    </>
  );
};
