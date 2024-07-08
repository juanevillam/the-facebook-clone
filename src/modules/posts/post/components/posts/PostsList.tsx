import { fetchPosts } from '../../api';
import { Post } from '../post/Post';

export const PostsList = async () => {
  const posts = await fetchPosts();

  return posts.map((post) => <Post key={post.id} {...post} />);
};
