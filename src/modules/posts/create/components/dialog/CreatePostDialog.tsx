import { FileInputRef, VoidFunction } from '@/assets/types';
import { ArrowLeftIcon } from '@/assets/ui/icons';
import { MobileDialog } from '@/components/mobile';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { setActiveGif } from '../../reducers/gifsSlice';
import {
  CreatePostFooter,
  CreatePostHeader,
  CreatePostLoader,
  CreatePostTextArea,
  CreatePostUserInfo,
} from '../shared/layout';
import {
  CreatePostCheckIn,
  CreatePostFeelings,
  CreatePostGifs,
  CreatePostMedia,
} from '../shared/steps';
import { CreatePostGifsItem } from '../shared/steps/gifs/item/CreatePostGifsItem';

interface CreatePostDialogProps {
  fileInputRef: FileInputRef;
  handleStep: VoidFunction;
}

export const CreatePostDialog = ({
  fileInputRef,
  handleStep,
}: CreatePostDialogProps) => {
  const dispatch = useAppDispatch();
  const { isOpenableOpen, step } = useAppSelector(
    (store) => store.posts.create.post
  );

  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);

  const handleRemoveActiveGif = () => dispatch(setActiveGif(null));

  const renderStepContent = () => {
    switch (step) {
      case 'media':
        return <CreatePostMedia fileInputRef={fileInputRef} />;
      case 'feelings':
        return <CreatePostFeelings />;
      case 'check-in':
        return <CreatePostCheckIn />;
      case 'gifs':
        return <CreatePostGifs />;
      case 'default':
      default:
        return (
          <>
            <CreatePostUserInfo />
            <CreatePostTextArea />
            {activeGif && (
              <div className="p-3">
                <div className="max-h-96 size-full">
                  <CreatePostGifsItem
                    active
                    gif={activeGif}
                    onClick={handleRemoveActiveGif}
                  />
                </div>
              </div>
            )}
            <CreatePostFooter />
            <CreatePostLoader />
          </>
        );
    }
  };

  return (
    <MobileDialog open={isOpenableOpen} translateFrom="y">
      <div className="flex flex-col h-full">
        <CreatePostHeader
          icon={{
            Component: ArrowLeftIcon,
            onClick: handleStep,
            name: 'back',
          }}
        />
        {renderStepContent()}
      </div>
    </MobileDialog>
  );
};
