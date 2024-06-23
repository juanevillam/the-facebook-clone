import { combineReducers } from '@reduxjs/toolkit';

import createReducer from '../create/reducers';

const postsReducer = combineReducers({
  create: createReducer,
});

export default postsReducer;
