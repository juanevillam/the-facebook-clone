import { ProfilePic } from '@/components';
import { LikeExtended } from '@/modules/posts/post/types';
import { Link } from '@/navigation';

type PostLikesBottomSheetBodyProps = {
  optimisticLikes: LikeExtended[];
};

export const PostLikesBottomSheetBody = ({
  optimisticLikes,
}: PostLikesBottomSheetBodyProps) => (
  <div className="overflow-y-auto">
    {optimisticLikes.map(({ user: { id, image, name, username } }) => (
      <Link
        key={id}
        className="primary-border primary-transition flex-center hover:primary-bg w-full space-x-2 border-b p-3"
        href={`/${username}` as any}
      >
        <ProfilePic image={image as string} name={name as string} />
        <h1 className="primary-text font-semibold leading-tight">{name}</h1>
      </Link>
    ))}
  </div>
);
