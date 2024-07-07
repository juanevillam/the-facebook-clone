import { auth } from '@/auth';
import { Feeling } from '@/modules/posts/create/assets/types';

import { PostBody } from './body/PostBody';
import { PostHeader } from './header/PostHeader';
import { PostType } from '../../assets/types';

export const Post = async ({ ...props }: PostType) => {
  const { createdAt, feeling, id, location, media, mediaType, thoughts, user } =
    props;

  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="card main-transition">
      <PostHeader
        createdAt={createdAt}
        feeling={feeling as Feeling}
        image={user.image as string}
        location={location as string}
        name={user.name as string}
        postId={id}
        userId={user.id}
      />
      <PostBody
        media={media as string}
        mediaType={mediaType as string}
        thoughts={thoughts as string}
      />
    </div>
  );
};
