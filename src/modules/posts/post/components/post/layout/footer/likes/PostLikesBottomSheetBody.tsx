import { useTranslations } from 'next-intl';

import { ProfilePic } from '@/components';
import { LikeExtended } from '@/modules/posts/post/types';
import { Link } from '@/navigation';

type PostLikesBottomSheetBodyProps = {
  optimisticLikes: LikeExtended[];
};

export const PostLikesBottomSheetBody = ({
  optimisticLikes,
}: PostLikesBottomSheetBodyProps) => {
  const t = useTranslations('links');

  return (
    <section className="overflow-y-auto">
      {optimisticLikes.map(({ user: { id, image, name, username } }) => (
        <Link
          key={id}
          aria-label={t('visit-profile', { user: name })}
          className="border-primary flex-align-center hover:bg-primary w-full space-x-2 border-b p-3"
          href={`/${username}` as any}
        >
          <ProfilePic image={image as string} name={name as string} />
          <h1 className="text-primary font-semibold leading-tight">{name}</h1>
        </Link>
      ))}
    </section>
  );
};
