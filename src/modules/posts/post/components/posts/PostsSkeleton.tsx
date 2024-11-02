import { PostSkeleton } from '../post/layout/common';

export const PostsSkeleton = () => {
  return [...Array(5)].map((_, index) => <PostSkeleton key={index} />);
};
