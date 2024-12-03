'use client';

import { Backdrop, Fade, Modal } from '@mui/material';

import { useMount } from '@/hooks';
import { usePathname, useRouter } from '@/navigation';

import { PostExtended } from '../../../types';
import { PostContent } from '../PostContent';

type PostModalProps = {
  post: PostExtended;
};

export const PostModal = ({ post }: PostModalProps) => {
  const router = useRouter();
  const mount = useMount();
  const pathname = usePathname();
  const isOpen =
    pathname.includes('posts') || pathname.includes('publicaciones');

  const closeModal = () => router.back();

  if (!mount) return null;

  return (
    <Modal
      className="!z-30"
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
        <div className="card absolute left-1/2 top-1/2 z-30 flex size-full -translate-x-1/2 -translate-y-1/2 transform flex-col overflow-hidden outline-none md:h-5/6 md:w-11/12 md:flex-row md:rounded-lg">
          <PostContent closeModal={closeModal} post={post} variant="modal" />
        </div>
      </Fade>
    </Modal>
  );
};
