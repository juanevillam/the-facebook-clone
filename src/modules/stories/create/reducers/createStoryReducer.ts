import { combineReducers } from '@reduxjs/toolkit';

import createStoryMediaReducer from './createStoryMediaSlice';
import createStoryStoryReducer from './createStoryStorySlice';

const createStoryReducer = combineReducers({
  createStoryMedia: createStoryMediaReducer,
  createStoryStory: createStoryStoryReducer,
});

export default createStoryReducer;
