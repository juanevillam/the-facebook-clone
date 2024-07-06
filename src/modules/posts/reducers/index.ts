import { combineReducers } from '@reduxjs/toolkit';

import createReducer from '../create/reducers';
import listReducer from '../list/reducers';

const postsReducer = combineReducers({
  create: createReducer,
  list: listReducer,
});

export default postsReducer;
