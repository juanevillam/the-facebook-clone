import { PostSkeleton } from './post';

export const PostsSkeleton = () => {
  return [...Array(5)].map((_, index) => <PostSkeleton key={index} />);
};
