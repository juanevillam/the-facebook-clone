import { ProfilePic } from '@/components';
import { useCurrentUser } from '@/hooks';
import { useAppSelector } from '@/lib/store/hooks';
import { PostUserInfo } from '@/modules/posts/components';
import { Feeling } from '@/modules/posts/create/assets/types';

export const CreatePostDefaultStepUserInfo = () => {
  const user = useCurrentUser();
  const { activeFeeling } = useAppSelector(
    (store) => store.posts.create.feelings
  );

  const { activeLocation } = useAppSelector(
    (store) => store.posts.create.checkIn
  );

  return (
    <div className="flex-center space-x-2 p-3 md:p-4">
      <ProfilePic />
      <PostUserInfo
        feeling={activeFeeling as Feeling}
        location={activeLocation?.structured_formatting.main_text}
        name={user?.name as string}
      />
    </div>
  );
};
