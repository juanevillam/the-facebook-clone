import { combineReducers } from '@reduxjs/toolkit';

import createStoryMediaReducer from './createStoryMediaReducer';
import createStoryStoryReducer from './createStoryStoryReducer';

const createStoryReducer = combineReducers({
  createStoryMedia: createStoryMediaReducer,
  createStoryStory: createStoryStoryReducer,
});

export default createStoryReducer;
