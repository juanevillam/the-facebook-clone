import { Post } from './post';
import { fetchPosts } from '../data';

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
