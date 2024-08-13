import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '@/modules/posts/reducers';

import authReducer from './reducers/auth-reducer';

export const store = configureStore({
  reducer: {
    authReducer,
    posts: postsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
