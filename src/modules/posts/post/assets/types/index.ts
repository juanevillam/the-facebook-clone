import type { Comment, Like, Post, SavedPost, User } from '@prisma/client';

export type CommentExtended = Comment & { user: User };

export type LikeExtended = Like & { user: User };

export type PostExtended = Post & {
  comments: CommentExtended[];
  likes: LikeExtended[];
  savedBy: SavedPost[];
  user: User;
};
