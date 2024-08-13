import { combineReducers } from '@reduxjs/toolkit';

import optionsReducer from './optionsSlice';

const createReducer = combineReducers({
  options: optionsReducer,
});

export default createReducer;
