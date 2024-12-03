import { PostSkeleton } from '../post/layout/shared';

export const PostsSkeleton = () => {
  return [...Array(5)].map((_, index) => <PostSkeleton key={index} />);
};
