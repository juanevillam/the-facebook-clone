import { combineReducers } from '@reduxjs/toolkit';

import createStoriesReducer from '../create/reducers/createStoriesReducer';

const storiesReducer = combineReducers({
  createStories: createStoriesReducer,
});

export default storiesReducer;
