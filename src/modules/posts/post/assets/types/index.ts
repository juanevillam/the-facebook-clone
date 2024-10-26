import type { Comment, Like, Post, SavedPost, User } from '@prisma/client';

type CommentExtended = Comment & { user: User };

type LikeExtended = Like & { user: User };

type PostExtended = Post & {
  comments: CommentExtended[];
  likes: LikeExtended[];
  savedBy: SavedPost[];
  user: User;
};

export type { CommentExtended, LikeExtended, PostExtended };
