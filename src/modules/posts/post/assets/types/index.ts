import type { Comment, Like, Post, SavedPost, User } from '@prisma/client';

export type comments = Comment & { user: User };

type Likes = Like & { user: User };

export type post = Post & {
  comments: comments[];
  likes: Likes[];
  savedBy: SavedPost[];
  user: User;
};
