'use client';

import classNames from 'classnames';
import Image from 'next/image';
import ReactPlayer from 'react-player';

interface PostBodyProps {
  media: string;
  mediaType: string;
  thoughts: string;
}

export const PostBody = ({ media, mediaType, thoughts }: PostBodyProps) => {
  return (
    <>
      <p
        className={classNames('main-text mb-1.5 pl-3', {
          'text-xl': !media,
        })}
      >
        {thoughts}
      </p>
      {media && (
        <div className="bg-black">
          {mediaType === 'image' && (
            <Image
              alt="Image"
              className="max-h-[600px] object-contain w-full"
              height={0}
              sizes="100vw"
              src={media as string}
              width={0}
            />
          )}
          {mediaType === 'gif' && (
            <Image
              alt="GIF"
              className="max-h-[600px] object-contain w-full"
              height={0}
              sizes="100vw"
              src={media as string}
              unoptimized
              width={0}
            />
          )}
          {mediaType === 'video' && (
            <ReactPlayer controls loop url={media} width="100%" />
          )}
        </div>
      )}
    </>
  );
};
