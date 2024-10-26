'use client';

import { Backdrop, Fade, Modal } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';

import { CloseIcon } from '@/assets/ui/icons';
import { FacebookLogoMark } from '@/assets/ui/icons/brand';
import { IconButton } from '@/components/buttons';
import { useMount } from '@/hooks';
import { Feeling } from '@/modules/posts/create/assets/types';
import { usePathname } from '@/navigation';

import { PostExtended } from '../../../assets/types';
import { PostFooter } from '../footer/PostFooter';
import { PostHeader } from '../header/PostHeader';
import { PostOptions } from '../options/PostOptions';

type PostModalProps = {
  id: string;
  post: PostExtended;
};

export const PostModal = ({ id, post }: PostModalProps) => {
  const {
    comments,
    createdAt,
    feeling,
    id: postId,
    likes,
    location,
    media,
    mediaType,
    thoughts,
    savedBy,
    user,
  } = post;

  const router = useRouter();
  const mount = useMount();
  const pathname = usePathname();
  const isOpen = pathname === `/posts/${id}`;

  const closeModal = () => router.back();

  if (!mount) return null;

  return (
    <Modal
      className="z-40"
      closeAfterTransition
      onClose={closeModal}
      open={isOpen}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <div className="card absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform outline-none md:h-5/6 md:w-11/12">
          <div className="flex size-full flex-col overflow-hidden md:flex-row md:rounded-lg">
            <div className="flex-grow bg-black">
              <div className="flex-center absolute left-0 top-2 w-full justify-between space-x-4 px-2 md:left-4 md:top-4 md:w-max md:px-0">
                <IconButton
                  className="size-10 bg-neutral-900 bg-opacity-50 hover:bg-neutral-700 hover:bg-opacity-50"
                  icon={{
                    className: 'stroke-2 stroke-white size-full',
                    Component: CloseIcon,
                    name: 'close',
                  }}
                  onClick={closeModal}
                />
                <FacebookLogoMark className="hidden size-10 md:block" />
                <div className="only-mobile">
                  <PostOptions
                    isPostModal
                    postId={post.id}
                    postSaves={post.savedBy}
                    postUserId={post.userId}
                  />
                </div>
              </div>
              <div className="h-full">
                {mediaType === 'image' && (
                  <Image
                    alt="Image"
                    className="size-full object-contain"
                    height={0}
                    priority
                    sizes="100vw"
                    src={media as string}
                    width={0}
                  />
                )}
                {mediaType === 'gif' && (
                  <Image
                    alt="GIF"
                    className="size-full object-contain"
                    height={0}
                    priority
                    sizes="100vw"
                    src={media as string}
                    unoptimized
                    width={0}
                  />
                )}
                {mediaType === 'video' && (
                  <ReactPlayer
                    controls
                    loop
                    url={media as string}
                    width="100%"
                  />
                )}
              </div>
            </div>
            <div className="md:card-bg absolute bottom-0 w-full bg-neutral-900 bg-opacity-50 md:static md:w-96 md:min-w-96 md:bg-transparent">
              <PostHeader
                createdAt={createdAt}
                feeling={feeling as Feeling}
                image={user.image as string}
                isPostModal
                location={location as string}
                name={user.name as string}
                postId={postId}
                postSaves={savedBy}
                postUserId={user.id}
              />
              <p className="primary-text mb-2 pl-3">{thoughts}</p>
              <PostFooter
                isPostModal
                postComments={comments}
                postLikes={likes}
                postId={post.id}
              />
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
