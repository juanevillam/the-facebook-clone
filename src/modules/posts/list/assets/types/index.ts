import type { Comment, Like, Post, SavedPost, User } from '@prisma/client';

export type PostCommentsType = Comment & { user: User };

export type PostLikesType = Like & { user: User };

export type PostType = Post & {
  comments: PostCommentsType[];
  likes: PostLikesType[];
  savedBy: SavedPost[];
  user: User;
};
