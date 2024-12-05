import { fetchPosts } from '../../services/postsService';
import { Post } from '../post';

export const Posts = async () => {
  const posts = await fetchPosts();

  return (
    <section className="space-y-1.5 md:space-y-4" role="list">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  );
};
