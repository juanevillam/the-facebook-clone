import { combineReducers } from '@reduxjs/toolkit';

import createPostCheckInStepReducer from './steps/createPostCheckInStepReducer';
import createPostFeelingsStepReducer from './steps/createPostFeelingsStepReducer';
import createPostGifsStepReducer from './steps/createPostGifsStepReducer';
import createPostMediaStepReducer from './steps/createPostMediaStepReducer';
import createPostPostReducer from './steps/createPostPostReducer';

const createPostReducer = combineReducers({
  createPostCheckInStep: createPostCheckInStepReducer,
  createPostFeelingsStep: createPostFeelingsStepReducer,
  createPostGifsStep: createPostGifsStepReducer,
  createPostMediaStep: createPostMediaStepReducer,
  createPostPost: createPostPostReducer,
});

export default createPostReducer;
