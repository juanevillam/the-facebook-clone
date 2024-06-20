import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth-reducer';
import postsReducer from './reducers/posts-reducer';

export const store = configureStore({
  reducer: {
    authReducer,
    postsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
