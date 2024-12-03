import { Backdrop, Fade, Modal } from '@mui/material';

import { useAppSelector } from '@/lib/store/hooks';

import { CreateStoryBody, CreateStorySidebar } from '../layout';

type CreateStoryModalProps = {
  handleToggleOpenable: VoidFunction;
};

export const CreateStoryModal = ({
  handleToggleOpenable,
}: CreateStoryModalProps) => {
  const { isOpenableOpen } = useAppSelector(
    (store) => store.stories.createStory.createStoryStory
  );

  return (
    <Modal
      className="only-desktop"
      closeAfterTransition
      onClose={handleToggleOpenable}
      open={isOpenableOpen}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpenableOpen}>
        <div className="card absolute left-1/2 top-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 transform flex-col overflow-hidden outline-none md:h-5/6 md:w-11/12 md:flex-row md:rounded-lg">
          <CreateStorySidebar handleToggleOpenable={handleToggleOpenable} />
          <CreateStoryBody />
        </div>
      </Fade>
    </Modal>
  );
};
