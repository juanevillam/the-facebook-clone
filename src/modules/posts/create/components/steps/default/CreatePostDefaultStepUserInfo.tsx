import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { useAppSelector } from '@/lib/store/hooks';
import { PostUserInfo } from '@/modules/posts/components';
import { Feeling } from '@/modules/posts/create/types';

export const CreatePostDefaultStepUserInfo = () => {
  const currentUser = useCurrentUser();
  const { activeFeeling } = useAppSelector(
    (store) => store.posts.createPost.createPostFeelingsStep
  );

  const { activeLocation } = useAppSelector(
    (store) => store.posts.createPost.createPostCheckInStep
  );

  return (
    <div className="flex-align-center space-x-2 p-3 md:p-4">
      <ProfilePic />
      <PostUserInfo
        feeling={activeFeeling as Feeling}
        location={activeLocation?.structured_formatting.main_text}
        name={currentUser?.name as string}
        username={currentUser?.username as string}
      />
    </div>
  );
};
