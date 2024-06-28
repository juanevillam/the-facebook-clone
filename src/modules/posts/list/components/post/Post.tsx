import { auth } from '@/auth';
import { Feeling } from '@/modules/posts/create/assets/types';

import { PostHeader } from './header/PostHeader';
import { PostType } from '../../assets/types';

export const Post = async ({ ...props }: PostType) => {
  const session = await auth();

  const { createdAt, feeling, location, user } = props;

  if (!session?.user) return null;

  return (
    <div className="bg-white duration-150 mb-1.5 pt-3 transition dark:bg-dark-100 md:mb-4 md:pb-2.5 md:rounded-lg">
      <PostHeader
        createdAt={createdAt}
        feeling={feeling as Feeling}
        image={user.image as string}
        location={location as string}
        name={user.name as string}
      />
    </div>
  );
};
