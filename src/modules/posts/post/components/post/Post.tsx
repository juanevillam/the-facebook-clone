import { auth } from '@/auth';
import { Feeling } from '@/modules/posts/create/assets/types';

import { PostBody } from './body/PostBody';
import { PostFooter } from './footer/PostFooter';
import { PostHeader } from './header/PostHeader';
import { PostExtended } from '../../assets/types';

export const Post = async ({ ...props }: PostExtended) => {
  const {
    comments,
    createdAt,
    feeling,
    id,
    likes,
    location,
    media,
    mediaType,
    thoughts,
    savedBy,
    user,
  } = props;

  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="card">
      <PostHeader
        createdAt={createdAt}
        feeling={feeling as Feeling}
        image={user.image as string}
        location={location as string}
        name={user.name as string}
        postId={id}
        postSaves={savedBy}
        postUserId={user.id}
      />
      <PostBody
        media={media as string}
        mediaType={mediaType as string}
        postId={id}
        thoughts={thoughts as string}
      />
      <PostFooter
        media={media as string}
        postComments={comments}
        postLikes={likes}
        postId={id}
      />
    </div>
  );
};
