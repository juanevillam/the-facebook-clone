import { combineReducers } from '@reduxjs/toolkit';

import checkInReducer from './checkInSlice';
import feelingsReducer from './feelingsSlice';
import gifsReducer from './gifsSlice';
import mediaReducer from './mediaSlice';
import postReducer from './postSlice';

const createReducer = combineReducers({
  post: postReducer,
  media: mediaReducer,
  feelings: feelingsReducer,
  checkIn: checkInReducer,
  gifs: gifsReducer,
});

export default createReducer;
