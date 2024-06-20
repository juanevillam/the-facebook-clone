import { MobileDialog } from '@/components/mobile';
import { useAppSelector } from '@/lib/store/hooks';

export const CreatePostDialog = () => {
  const { createPostOpenableOpen } = useAppSelector(
    (store) => store.postsReducer
  );

  return (
    <MobileDialog open={createPostOpenableOpen} translateFrom="y">
      <div className="flex flex-col h-full">CreatePostDialog</div>
    </MobileDialog>
  );
};
