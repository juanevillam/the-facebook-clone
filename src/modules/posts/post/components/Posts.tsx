import { Post } from './post/Post';
import { fetchPosts } from '../api';

export const Posts = async () => {
  const posts = await fetchPosts();

  return posts.map((post) => <Post key={post.id} {...post} />);
};
