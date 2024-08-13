import { combineReducers } from '@reduxjs/toolkit';

import createReducer from '../create/reducers';
import postReducer from '../post/reducers';

const postsReducer = combineReducers({
  create: createReducer,
  post: postReducer,
});

export default postsReducer;
