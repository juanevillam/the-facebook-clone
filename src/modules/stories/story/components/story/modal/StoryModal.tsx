'use client';

import { Backdrop, Fade, Modal } from '@mui/material';

import { useMount } from '@/hooks';
import { StoryExtended } from '@/modules/posts/post/assets/types';
import { usePathname, useRouter } from '@/navigation';

type StoryModalProps = {
  story: StoryExtended;
};

export const StoryModal = ({ story }: StoryModalProps) => {
  const router = useRouter();
  const mount = useMount();
  const pathname = usePathname();
  const isOpen = pathname === '/stories/[id]';

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
          StoryModal
        </div>
      </Fade>
    </Modal>
  );
};
