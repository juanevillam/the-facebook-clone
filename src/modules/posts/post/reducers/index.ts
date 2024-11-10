import { combineReducers } from '@reduxjs/toolkit';

import footerOptionsReducer from './footerOptionsSlice';
import headerOptionsReducer from './headerOptionsSlice';

const createReducer = combineReducers({
  footerOptions: footerOptionsReducer,
  headerOptions: headerOptionsReducer,
});

export default createReducer;
