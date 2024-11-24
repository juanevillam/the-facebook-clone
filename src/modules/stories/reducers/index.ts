import { combineReducers } from '@reduxjs/toolkit';

import createReducer from '../create/reducers';

const storiesReducer = combineReducers({
  create: createReducer,
});

export default storiesReducer;
