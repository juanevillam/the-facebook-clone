import { PostExtended } from '../../types';
import { Post } from '../post';

type PostsProps = {
  posts: PostExtended[];
};

export const Posts = ({ posts }: PostsProps) => (
  <section className="space-y-1.5 md:space-y-4" role="list">
    {posts.map((post) => (
      <Post key={post.id} {...post} />
    ))}
  </section>
);
