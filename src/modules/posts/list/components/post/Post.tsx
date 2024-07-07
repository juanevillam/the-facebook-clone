import { auth } from '@/auth';
import { Feeling } from '@/modules/posts/create/assets/types';

import { PostBody } from './body/PostBody';
import { PostFooter } from './footer/PostFooter';
import { PostHeader } from './header/PostHeader';
import { PostType } from '../../assets/types';

export const Post = async ({ ...props }: PostType) => {
  const {
    createdAt,
    feeling,
    id,
    likes,
    location,
    media,
    mediaType,
    thoughts,
    user,
  } = props;

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
        postUserId={user.id}
      />
      <PostBody
        media={media as string}
        mediaType={mediaType as string}
        thoughts={thoughts as string}
      />
      <PostFooter media={media as string} postLikes={likes} postId={id} />
    </div>
  );
};
