import { combineReducers } from '@reduxjs/toolkit';

import createStoriesMediaReducer from './createStoriesMediaSlice';
import createStoriesStoryReducer from './createStoriesStorySlice';

const createStoriesReducer = combineReducers({
  createStoriesMedia: createStoriesMediaReducer,
  createStoriesStory: createStoriesStoryReducer,
});

export default createStoriesReducer;
