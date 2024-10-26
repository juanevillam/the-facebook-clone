import { ActionLoader } from '@/components';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

import { CreatePostDefaultStepButton } from './button/CreatePostDefaultStepButton';
import { CreatePostDefaultStepFooter } from './footer/CreatePostDefaultStepFooter';
import { CreatePostDefaultStepTextArea } from './text-area/CreatePostDefaultStepTextArea';
import { CreatePostDefaultStepUserInfo } from './user-info/CreatePostDefaultStepUserInfo';
import { setActiveGif } from '../../../reducers/gifsSlice';
import { CreatePostGifsStepItem } from '../gifs/item/CreatePostGifsStepItem';

export const CreatePostDefaultStep = () => {
  const dispatch = useAppDispatch();
  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);
  const { posting } = useAppSelector((store) => store.posts.create.post);

  const handleRemoveActiveGif = () => dispatch(setActiveGif(null));

  return (
    <>
      <CreatePostDefaultStepUserInfo />
      <CreatePostDefaultStepTextArea />
      <div className="md:space-y-4 md:p-4 md:pt-2">
        {activeGif && (
          <div className="p-3 md:p-0">
            <div className="create-post-modal-gif-size">
              <CreatePostGifsStepItem
                active
                gif={activeGif}
                onClick={handleRemoveActiveGif}
              />
            </div>
          </div>
        )}
        <CreatePostDefaultStepFooter />
        <div className="only-desktop">
          <CreatePostDefaultStepButton />
        </div>
      </div>
      <ActionLoader
        className="md:rounded-lg"
        message="posting"
        open={posting}
      />
    </>
  );
};
