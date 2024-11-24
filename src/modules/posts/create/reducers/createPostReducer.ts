import { combineReducers } from '@reduxjs/toolkit';

import createPostPostReducer from './createPostPostReducer';
import createPostCheckInStepReducer from './steps/createPostCheckInStepReducer';
import createPostFeelingsStepReducer from './steps/createPostFeelingsStepReducer';
import createPostGifsStepReducer from './steps/createPostGifsStepReducer';
import createPostMediaStepReducer from './steps/createPostMediaStepReducer';

const createPostReducer = combineReducers({
  createPostPost: createPostPostReducer,
  createPostCheckInStep: createPostCheckInStepReducer,
  createPostFeelingsStep: createPostFeelingsStepReducer,
  createPostGifsStep: createPostGifsStepReducer,
  createPostMediaStep: createPostMediaStepReducer,
});

export default createPostReducer;
