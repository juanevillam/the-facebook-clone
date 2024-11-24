import { combineReducers } from '@reduxjs/toolkit';

import createStoriesMediaReducer from './createStoryMediaSlice';
import createStoriesStoryReducer from './createStoryStorySlice';

const createStoryReducer = combineReducers({
  createStoriesMedia: createStoriesMediaReducer,
  createStoriesStory: createStoriesStoryReducer,
});

export default createStoryReducer;
