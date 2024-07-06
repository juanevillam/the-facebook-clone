import { combineReducers } from '@reduxjs/toolkit';

import commentsReducer from './commentsSlice';
import headerOptionsReducer from './headerOptionsSlice';

const createReducer = combineReducers({
  headerOptions: headerOptionsReducer,
  comments: commentsReducer,
});

export default createReducer;
