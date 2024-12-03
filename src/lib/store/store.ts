import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/modules/auth/reducers/authReducer';
import postsReducer from '@/modules/posts/reducers/postsReducer';
import storiesReducer from '@/modules/stories/reducers/storiesReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    stories: storiesReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
