import type { Comment, Like, Post, SavedPost, User } from '@prisma/client';

type Comments = Comment & { user: User };

type Likes = Like & { user: User };

export type post = Post & {
  comments: Comments[];
  likes: Likes[];
  savedBy: SavedPost[];
  user: User;
};
