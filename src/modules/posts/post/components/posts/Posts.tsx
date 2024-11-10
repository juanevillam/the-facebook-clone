import { fetchPosts } from '../../data';
import { Post } from '../post';

export const Posts = async () => {
  const posts = await fetchPosts();

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
};
