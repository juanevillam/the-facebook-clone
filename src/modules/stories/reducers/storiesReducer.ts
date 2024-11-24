import { combineReducers } from '@reduxjs/toolkit';

import createStoryReducer from '../create/reducers/createStoryReducer';

const storiesReducer = combineReducers({
  createStory: createStoryReducer,
});

export default storiesReducer;
