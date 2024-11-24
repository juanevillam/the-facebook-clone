import { combineReducers } from '@reduxjs/toolkit';

import mediaReducer from './mediaSlice';
import storyReducer from './storySlice';

const createReducer = combineReducers({
  story: storyReducer,
  media: mediaReducer,
});

export default createReducer;
