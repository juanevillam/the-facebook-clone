import { combineReducers } from '@reduxjs/toolkit';

import createPostReducer from '../create/reducers/createPostReducer';
import postReducer from '../post/reducers/postReducer';

const postsReducer = combineReducers({
  createPost: createPostReducer,
  postsPost: postReducer,
});

export default postsReducer;
