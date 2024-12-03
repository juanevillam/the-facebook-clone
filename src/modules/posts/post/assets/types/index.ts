import type {
  Comment,
  Like,
  Post,
  SavedPost,
  Story,
  StoryItem,
  StoryItemView,
  User,
} from '@prisma/client';

type CommentExtended = Comment & { user: User };

type LikeExtended = Like & { user: User };

type PostExtended = Post & {
  comments: CommentExtended[];
  likes: LikeExtended[];
  savedBy: SavedPost[];
  user: User;
};

type StoryItemExtended = StoryItem & { views: StoryItemView[] };

type StoryExtended = Story & {
  items: StoryItemExtended[];
  user: User;
};

export type {
  CommentExtended,
  LikeExtended,
  PostExtended,
  StoryItemExtended,
  StoryExtended,
};
